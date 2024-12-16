from django.shortcuts import render
from django.contrib.auth import get_user_model

User = get_user_model()
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import *
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from django.db.models import Sum
from django.http import JsonResponse


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Logout successful"}, status=204)
        except Exception as e:
            return Response(f"error: {e}", status=400)


class AccountCreateView(generics.CreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AccountRetrieveView(generics.ListAPIView):
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs.get("id")
        return Account.objects.filter(user_id=user_id)


class UserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return User.objects.all()


class UserAccountListView(generics.ListAPIView):
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Account.objects.filter(user=self.request.user)


class UserTransactionView(generics.ListAPIView):
    serializer_class = UserTransactionSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return UserTransaction.objects.filter(user=self.request.user)


class AccountTransactionView(generics.ListAPIView):
    serializer_class = AccountTransactionSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return AccountTransaction.objects.all()


class TransactionView(generics.CreateAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Transaction.objects.all()

    def post(self, request):
        try:
            data = request.data
            sender_id = data.get("account")
            receiver_id = data.get("receiver")
            amount = data.get("amount")
            save_account = data.get("save_account", False)
            alias = data.get("alias")
            if not receiver_id or not amount:
                return Response(
                    {"error": "Receiver ID and amount are required"}, status=400
                )

            try:
                amount = float(amount)
            except ValueError:
                return Response({"error": "Amount must be a number"}, status=400)

            if amount <= 0:
                return Response(
                    {"error": "Amount must be greater than zero"}, status=400
                )

            try:
                sender = Account.objects.get(id=sender_id)
                receiver = Account.objects.get(id=receiver_id)
            except Account.DoesNotExist:
                return Response({"error": "Sender or receiver not found"}, status=404)

            if sender.balance < amount:
                return Response({"error": "Insufficient balance"}, status=400)

            sender.balance -= amount
            receiver.balance += amount
            sender.save()
            receiver.save()

            transaction = Transaction.objects.create(
                sender=sender,
                receiver=receiver,
                amount=amount,
                details=data.get("details", ""),
            )

            if save_account:

                preferences, created = AccountPreference.objects.get_or_create(
                    user=sender.user,
                    receiver=receiver,
                    defaults={"alias": alias},
                )

                if not created and alias and preferences.alias != alias:
                    preferences.alias = alias
                    preferences.save()

            return Response(
                {"detail": "Transaction successful", "transaction_id": transaction.id},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response(
                {"error": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class AccountPreferenceView(generics.ListCreateAPIView):
    serializer_class = AccountPreferenceSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return AccountPreference.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BuyStockView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        symbol = request.data.get("symbol")
        quantity = request.data.get("quantity")
        account_id = request.data.get("account_id")
        price = request.data.get("price")

        if not symbol or not quantity or not account_id or not price:
            return Response(
                {"error": "Symbol, quantity, account_id, and price are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            quantity = int(quantity)
            if quantity <= 0:
                raise ValueError("Quantity must be positive.")
            price = float(price)
            if price <= 0:
                raise ValueError("Price must be positive.")
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        try:
            account = Account.objects.get(id=account_id, user=user)
        except Account.DoesNotExist:
            return Response(
                {"error": "Account not found or does not belong to the user."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if account.account_type != "INVESTMENT":
            return Response(
                {"error": "You need to use your investments account to buy stocks."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        total_price = quantity * price

        if account.balance < total_price:
            return Response(
                {"error": "Insufficient balance in the account."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        account.balance -= total_price
        account.save()

        purchase, created = Purchase.objects.get_or_create(
            user=user, stock_symbol=symbol
        )
        if created:
            purchase.quantity = quantity
        else:
            purchase.quantity += quantity

        purchase.save()

        return Response(
            {"message": f"Successfully purchased {quantity} of {symbol}."},
            status=status.HTTP_201_CREATED,
        )


class SellStockView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        symbol = request.data.get("symbol")
        quantity = request.data.get("quantity")
        account_id = request.data.get("account_id")
        price = request.data.get("price")

        if not symbol or not quantity or not account_id or not price:
            return Response(
                {"error": "Symbol, quantity, account_id, and price are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            quantity = int(quantity)
            if quantity <= 0:
                raise ValueError("Quantity must be positive.")
            price = float(price)
            if price <= 0:
                raise ValueError("Price must be positive.")
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        try:
            account = Account.objects.get(id=account_id)
        except Account.DoesNotExist:
            return Response(
                {"error": "Account not found or does not belong to the user."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if account.account_type != "INVESTMENT":
            return Response(
                {"error": "You need to use your investments account to sell stocks."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        total_price = quantity * price

        try:
            purchase = Purchase.objects.get(user=user, stock_symbol=symbol)
            if purchase.quantity < quantity:
                return Response(
                    {"error": "Not enough shares to sell."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if purchase.quantity == quantity:
                purchase.delete()
            else:
                purchase.quantity -= quantity
                purchase.save()

            account.balance += total_price
            account.save()

        except Purchase.DoesNotExist:
            return Response(
                {"error": "You do not own any shares of this stock."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            {"message": f"Successfully sold {quantity} of {symbol}."},
            status=status.HTTP_200_OK,
        )


class PortfolioView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        portfolio = (
            Purchase.objects.filter(user=user)
            .values("stock_symbol")
            .annotate(total_quantity=Sum("quantity"))
        )
        return Response(portfolio, status=status.HTTP_200_OK)


class LoanView(APIView):
    def get(self, request):
        account_id = request.query_params.get("account_id")
        if not account_id:
            return Response(
                {"error": "Account ID is required."}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            loans = Loan.objects.filter(account_id=account_id)
            serializer = LoanSerializer(loans, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Account.DoesNotExist:
            return Response(
                {"error": "Account not found."}, status=status.HTTP_404_NOT_FOUND
            )

    def post(self, request):

        loan_amount = request.data.get("loan_amount")
        loan_duration = request.data.get("loan_duration")
        monthly_income = request.data.get("monthly_income")
        account_id = request.data.get("account_id")

        if not all([loan_amount, loan_duration, monthly_income, account_id]):
            return Response(
                {
                    "error": "Loan amount, loan duration, monthly income, and account ID are required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            account = Account.objects.get(id=account_id)
        except Account.DoesNotExist:
            return Response(
                {"error": "Account not found."}, status=status.HTTP_404_NOT_FOUND
            )

        if account.credit_score < 600:
            return Response(
                {"error": "Credit score is too low for a loan application."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if float(loan_amount) > float(monthly_income) * 10:
            return Response(
                {"error": "Loan amount exceeds 10x your monthly income."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        loan = Loan.objects.create(
            account=account,
            loan_amount=loan_amount,
            loan_duration=loan_duration,
        )
        serializer = LoanSerializer(loan)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoanPaymentView(APIView):
    def post(self, request):

        loan_id = request.data.get("loan_id")
        payment_amount = request.data.get("payment_amount")

        if not loan_id or not payment_amount:
            return Response(
                {"error": "Loan ID and payment amount are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            loan = Loan.objects.get(id=loan_id)
        except Loan.DoesNotExist:
            return Response(
                {"error": "Loan not found."}, status=status.HTTP_404_NOT_FOUND
            )

        if float(payment_amount) <= 0:
            return Response(
                {"error": "Payment amount must be greater than 0."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        remaining_balance = float(loan.loan_amount)
        if float(payment_amount) > remaining_balance:
            return Response(
                {"error": "Payment amount exceeds the remaining loan balance."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        loan.loan_amount = remaining_balance - float(payment_amount)
        loan.save()

        return Response(
            {
                "message": "Payment successful.",
                "remaining_balance": loan.loan_amount,
                "loan_id": loan.id,
            },
            status=status.HTTP_200_OK,
        )
