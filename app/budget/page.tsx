import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Plus,
} from "lucide-react";

const BudgetPage = () => {
  const transactions = [
    {
      id: 1,
      description: "Monthly Allowance",
      amount: 5000,
      type: "income",
      date: "Feb 1, 2026",
      category: "Income",
    },
    {
      id: 2,
      description: "Groceries",
      amount: -850,
      type: "expense",
      date: "Feb 3, 2026",
      category: "Food",
    },
    {
      id: 3,
      description: "Transportation",
      amount: -300,
      type: "expense",
      date: "Feb 4, 2026",
      category: "Transport",
    },
  ];

  const totalIncome = 5000;
  const totalExpenses = 1150;
  const balance = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#FFD700] mb-2">
              Budget Tracker
            </h1>
            <p className="text-gray-400">Track your income and expenses</p>
          </div>
          <Button className="bg-[#FFD700] text-[#1E1E1E] hover:bg-[#FFD700]/90 font-semibold">
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Balance
            </CardTitle>
            <Wallet className="h-4 w-4 text-[#FFD700]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#FFD700]">
              ₱{balance.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">Available funds</p>
          </CardContent>
        </Card>

        <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Income
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              ₱{totalIncome.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Expenses
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              ₱{totalExpenses.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <Card
              key={transaction.id}
              className="bg-[#2A2A2A] border-[#3A3A3A] hover:border-[#FFD700] transition-all"
            >
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-lg ${
                        transaction.type === "income"
                          ? "bg-green-500/20"
                          : "bg-red-500/20"
                      }`}
                    >
                      <DollarSign
                        className={`h-5 w-5 ${
                          transaction.type === "income"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">
                        {transaction.description}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-gray-400">
                          {transaction.category}
                        </span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-400">
                          {transaction.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`text-xl font-bold ${
                      transaction.type === "income"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}₱
                    {Math.abs(transaction.amount).toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
