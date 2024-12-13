from django.shortcuts import render
from django.contrib.auth import get_user_model

User = get_user_model()
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import *
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


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
