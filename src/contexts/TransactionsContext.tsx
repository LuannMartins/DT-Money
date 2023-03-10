import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
    description: string;
    price: number;
    category: string;
    type: 'income' | 'outcome';
  }

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
          q: query,
        }
    })

    setTransactions(response.data); // mais pode se ultilizar uma função async dentro do useeffect
  }

  async function createTransaction(data: CreateTransactionInput) {
    const { description, price, category, type } = data

    const response = await api.post('transactions', {
      description,
      price,
      category, 
      type,
      createdAt: new Date(),
    })

    setTransactions(state => [response.data, ...state]);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{
      transactions,
      fetchTransactions,
      createTransaction,
    }}>
      {children}
    </TransactionsContext.Provider>
  );
}

// useEffect(() => {
//     fetch('http://localhost:3333/transactions')
//     .then(response => response.json())
//     .then(data => {
//         console.log(data); // useEffect não pode usar o async
//     })
// }, []) 

// const [transactions, setTransactions] = useState<Transaction[]>([]);

// async function fetchTransactions() {
//   const response = await fetch('http://localhost:3333/transactions');
//   const data = await response.json(); 
//   setTransactions(data); // mais pode se ultilizar uma função async dentro do useffect
// }

// useEffect(() => {
//   fetchTransactions();
// }, []);



