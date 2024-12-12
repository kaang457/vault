from django.shortcuts import render
from django.contrib.auth import get_user_model

User = get_user_model()
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import *
from rest_framework import generics
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
    permission_classes = [IsAuthenticated]

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
