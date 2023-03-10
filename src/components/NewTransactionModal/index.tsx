import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton} from './styles';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { useContextSelector } from 'use-context-selector';

const newTransactionFormShema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
})

type newTransactionFormInputs = z.infer<typeof newTransactionFormShema>

export function NewTransactionModal() {
    const createTransaction = useContextSelector(TransactionsContext, (context) => {
      return context.createTransaction; // Aplicando Context Selectors
    })

    const {
        control,
        register, 
        handleSubmit, 
        formState: { isSubmitting },
        reset,
      } = useForm<newTransactionFormInputs>({
      resolver: zodResolver(newTransactionFormShema),
    })
  
    async function handleCreateNewTransaction (data: newTransactionFormInputs) {
      const { description, price, category, type } = data

      await createTransaction({
        description,
        price,
        category, 
        type,
      })  
        
      reset();
    }

    return (
        <Dialog.Portal>
        <Overlay />

        <Content>
            <Dialog.Title>Nova Transação</Dialog.Title>  
            <CloseButton asChild>
                <X size={24}/>
            </CloseButton>   

            <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                <input 
                  type="text"
                  placeholder="Descrição" 
                  required
                  {...register('description')}
                />
                <input 
                  type="number"
                  placeholder="Preço" 
                  required
                  {...register('price', {valueAsNumber: true})}
                />
                <input 
                  type="text"
                  placeholder="Categoria" 
                  required
                  {...register('category')}
                />

                <Controller 
                  control={control}
                  name="type"
                  render={({ field }) => {
                    return (
                    <TransactionType 
                      onValueChange={field.onChange} 
                      value={field.value}
                    >
                        <TransactionTypeButton variant='income' value='income'>
                            <ArrowCircleUp size={24} />
                            Entrada
                        </TransactionTypeButton>
    
                        <TransactionTypeButton variant='outcome' value='outcome'>
                            <ArrowCircleDown size={24} />
                            Saída
                        </TransactionTypeButton>
                    </TransactionType>    
                    )
                  }}
                />

                <button type="submit" disabled={isSubmitting}>
                    Cadastrar
                </button>
            </form>

        </Content>
        </Dialog.Portal>
    )
}
