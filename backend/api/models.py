from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)
from api.managers import UserManager
import uuid


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    def __str__(self):
        """Return string representation of our user"""
        return self.email


class Account(models.Model):
    ACCOUNT_TYPES = [
        ("SAVINGS", "Savings"),
        ("CHECKING", "Checking"),
        ("BUSINESS", "Business"),
        ("JOINT", "Joint"),
    ]

    CURRENCIES = [
        ("TL", "Turkish Lira"),
        ("USD", "US Dollar"),
        ("EUR", "Euro"),
        ("GBP", "British Pound"),
        ("JPY", "Japanese Yen"),
        ("CAD", "Canadian Dollar"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="accounts")
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    account_type = models.CharField(max_length=20, choices=ACCOUNT_TYPES)
    currency = models.CharField(max_length=3, choices=CURRENCIES)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.account_type} account for {self.user.name} ({self.currency})"

    def save(self, *args, **kwargs):

        is_new = self._state.adding
        super().save(*args, **kwargs)

        if is_new:

            UserTransaction.objects.create(
                user=self.user,
                transaction_type="ACCOUNT_CREATION",
                details=f"Created account {self.id} ({self.account_type}, {self.currency}) with initial balance {self.balance}",
            )

            AccountTransaction.objects.create(
                account=self,
                transaction_type="ACCOUNT_CREATION",
                details=f"Account created for {self.user.email} with balance {self.balance}",
            )


class UserTransaction(models.Model):
    TRANSACTION_TYPES = [
        ("ACCOUNT_CREATION", "Account Creation"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        "User", on_delete=models.CASCADE, related_name="user_transactions"
    )
    transaction_type = models.CharField(max_length=50, choices=TRANSACTION_TYPES)
    timestamp = models.DateTimeField(auto_now_add=True)
    details = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.transaction_type} for {self.user.email} at {self.timestamp}"


class AccountTransaction(models.Model):
    TRANSACTION_TYPES = [
        ("ACCOUNT_CREATION", "Account Creation"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    account = models.ForeignKey(
        "Account", on_delete=models.CASCADE, related_name="account_transactions"
    )
    transaction_type = models.CharField(max_length=50, choices=TRANSACTION_TYPES)
    timestamp = models.DateTimeField(auto_now_add=True)
    details = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.transaction_type} for {self.account} at {self.timestamp}"
