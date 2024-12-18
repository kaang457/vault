from django.urls import path
from .views import *

urlpatterns = [
    path("users/", UserListView.as_view(), name="user-list"),
    path("users/accounts/", UserAccountListView.as_view(), name="user-accounts"),
    path("accounts/", AccountCreateView.as_view(), name="account-create"),
    path("accounts/<uuid:id>/", AccountRetrieveView.as_view(), name="account-retrieve"),
    path(
        "account-transactions/",
        AccountTransactionView.as_view(),
        name="account-transactions",
    ),
    path(
        "user-transactions/",
        UserTransactionView.as_view(),
        name="user-transactions",
    ),
    path(
        "account-preferences/",
        AccountPreferenceView.as_view(),
        name="accountpreferences",
    ),
    path("transactions/", TransactionView.as_view(), name="transactions"),
    path("stocks/buy/", BuyStockView.as_view(), name="buystocks"),
    path("stocks/sell/", SellStockView.as_view(), name="sellstocks"),
    path("stocks/portfolio/", PortfolioView.as_view(), name="portfolio"),
    path("loans/", LoanView.as_view(), name="loans"),
    path("loans/pay/", LoanPaymentView.as_view(), name="loan-payment"),
]
