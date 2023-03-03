import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import * as Dialog from '@radix-ui/react-dialog';
import logoImg from '../../assets/logo.svg'

export function Header() {
    return (
      <HeaderContainer>
        <HeaderContent>
            <img src={logoImg} alt="" />

            <Dialog.Root>
                <Dialog.Trigger>
                    <NewTransactionButton>Nova Transação</NewTransactionButton>
                </Dialog.Trigger>
            </Dialog.Root>
            
                <Dialog.Portal>
                    <Dialog.Overlay />

                    <Dialog.Content>
                        <Dialog.Title>Nova Transação</Dialog.Title>
                        
                        <Dialog.Description />
                        
                        <Dialog.Close />
                    </Dialog.Content>

                </Dialog.Portal>
        </HeaderContent>
      </HeaderContainer>
    )
}