import Modal from 'react-modal'
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { GlobalStyle } from "./styles/global";
import { createServer } from 'miragejs'
import { useState } from 'react';
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionsProvider } from './hooks/useTransactions';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return [
        {
          id: 1, 
          title: 'Transaction 1',
          amount: 400,
          type: 'deposity',
          category: 'Food',
          createdAt: new Date()
        }
      ]
    })
  }
})

Modal.setAppElement('#root')

function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

  function handleOpenNewTransactionModal() {
      setIsNewTransactionModalOpen(true)
  }
  
  function handleCloseNewTransactionModal() {
      setIsNewTransactionModalOpen(false)
  }

  return (
    <TransactionsProvider>
      <Header onNewTransactionModal={handleOpenNewTransactionModal}/>
      <Dashboard/>
        <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal}/>
      <GlobalStyle/>
    </TransactionsProvider>
  );
}

export default App;