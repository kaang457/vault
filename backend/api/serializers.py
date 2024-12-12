from django.contrib.auth import get_user_model

User = get_user_model()
from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "name", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = "__all__"
        read_only_fields = ["user"]


class AccountTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountTransaction
        fields = "__all__"


class UserTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTransaction
        fields = "__all__"
