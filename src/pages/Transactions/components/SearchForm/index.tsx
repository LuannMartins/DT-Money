import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import { SearchFormContainer } from "./styles";
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

/**
 * Por que que um componente renderiza?
 * 
 * - Hooks changed (modou estado, contexto, reducer);
 * - Props changed (modou propriedades);
 * - Parent redender (componente pai renderizou)
 * 
 * Qual o fluxo de renderização?
 * 
 * 1. React recria o HTML da interface adquele componente
 * 2. Compara a versão do HTML recriada com a versão anterior
 * 3. Se mudou alguma coisa, ele reescreve o HTML na tela
 * 
 * O que é o memo?
 * 
 * - Memo é uma função que usa em componentes do react e 
 * serve para memorizar aquele componente
 * 
 * - Passos do Memo: só usamos o memo quando o HTML tem muitas linhas de código.
 * 
 *  0. Hooks changed, Props changed (deep comparison)
 *  0.1: Comparar a versão anterior dos hooks e props
 *  0.2: Se mudou algo, ele vai permitir a nova renderização
 */

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const fetchTransactions = useContextSelector(TransactionsContext, (context) => {
    return context.fetchTransactions; // Aplicando Context Selectors
  })

  const { 
      register, 
      handleSubmit, 
      formState: { isSubmitting } 
    } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTranscations(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTranscations)}>
          <input 
            type="text" 
            placeholder="Busque por Transações" 
            {...register('query')}
          />

          <button type="submit" disabled={isSubmitting}>
            <MagnifyingGlass size={20}/>
            Buscar
          </button>
        </SearchFormContainer>
    )
}

// export const SearchForm = memo(SearchFormComponent); não vale ultilizar em HTML com poucas linhas