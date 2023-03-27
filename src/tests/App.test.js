import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testes do App TrybeWallet', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />);
  });

  const emailInput = 'email-input';
  const passwordInput = 'password-input';
  const valueInput = 'value-input';
  const descriptionInput = 'description-input';
  const totalField = 'total-field';
  const deleteButton = 'delete-btn';

  describe('Testes da página de Login', () => {
    it('Testa se existem os campos de e-mail, senha e o botão de entrar', () => {
      expect(screen.getByTestId(emailInput)).toBeInTheDocument();
      expect(screen.getByTestId(passwordInput)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    });

    it('Testa se o botão de entrar está desabilitado caso não atenda às exigências', () => {
      expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled();
    });

    it('Testa se botão de entrar está habilitado para um e-mail válido e uma senha de no mínimo 6 dígitos', () => {
      userEvent.type(screen.getByTestId(emailInput), 'ab.bogo@gmail.com');
      userEvent.type(screen.getByTestId(passwordInput), '123456');
      expect(screen.getByRole('button', { name: /entrar/i })).toBeEnabled();
    });
  });

  describe('Testes da página da Carteira', () => {
    beforeEach(() => {
      userEvent.type(screen.getByTestId(emailInput), 'ab.bogo@gmail.com');
      userEvent.type(screen.getByTestId(passwordInput), '123456');
      userEvent.click(screen.getByRole('button', { name: /entrar/i }));
    });

    it('Testa se são exibidos os campos de valor, descrição, moeda, método de pagamento e categoria e o botão de adicionar despesa', () => {
      expect(screen.getByTestId(valueInput)).toBeInTheDocument();
      expect(screen.getByTestId('currency-input')).toBeInTheDocument();
      expect(screen.getByTestId('method-input')).toBeInTheDocument();
      expect(screen.getByTestId('tag-input')).toBeInTheDocument();
      expect(screen.getByTestId(descriptionInput)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /adicionar despesa/i })).toBeInTheDocument();
    });

    it('Testa se uma despesa é adicionada ao clicar no botão de adicionar despesa', async () => {
      userEvent.type(screen.getByTestId(valueInput), '10');
      userEvent.type(screen.getByTestId(descriptionInput), 'Despesa teste');
      userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));
      await waitFor(() => expect(screen.getByText(/despesa teste/i)).toBeInTheDocument());
      await waitFor(() => expect(screen.getByTestId(totalField)).not.toHaveTextContent('0.00'));
    });

    it('Testa se uma despesa é removida ao clicar no botão de excluir', async () => {
      userEvent.type(screen.getByTestId(valueInput), '10');
      userEvent.type(screen.getByTestId(descriptionInput), 'Despesa');
      userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));
      await waitFor(() => expect(screen.getByTestId('edit-btn')).toBeInTheDocument());
      await waitFor(() => expect(screen.getByTestId(deleteButton)).toBeInTheDocument());

      userEvent.click(screen.getByTestId(deleteButton));
      expect(screen.getByTestId(totalField)).toHaveTextContent('0.00');
    });

    it('Testa se uma despesa é editada ao clicar no botão de editar', async () => {
      userEvent.type(screen.getByTestId(valueInput), '10');
      userEvent.type(screen.getByTestId(descriptionInput), 'Despesa');
      userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));
      await waitFor(() => expect(screen.getByTestId('edit-btn')).toBeInTheDocument());

      userEvent.click(screen.getByTestId('edit-btn'));
      expect(screen.getByTestId(deleteButton)).toBeDisabled();
      expect(screen.getByRole('heading', { name: /editando a despesa: despesa/i, level: 4 })).toBeInTheDocument();

      userEvent.type(screen.getByTestId(descriptionInput), 'Despesa editada');
      userEvent.click(screen.getByRole('button', { name: /editar despesa/i }));
      expect(screen.getByText(/despesa editada/i)).toBeInTheDocument();
    });
  });

  describe('Testes do componente Header', () => {
    beforeEach(() => {
      userEvent.type(screen.getByTestId(emailInput), 'allysonbogo@gmail.com');
      userEvent.type(screen.getByTestId(passwordInput), '123456');
      userEvent.click(screen.getByRole('button', { name: /entrar/i }));
    });

    it('Devem ser exibidos no Header o título, e-mail, a despesa total e a moeda de conversão deve ser \'BRL\'', () => {
      expect(screen.getByText(/trybewallet/i)).toBeInTheDocument();
      expect(screen.getByText(/e-mail: allysonbogo@gmail.com/i)).toBeInTheDocument();
      expect(screen.getByTestId(totalField)).toBeInTheDocument();
      expect(screen.getByTestId('header-currency-field')).toHaveTextContent('BRL');
    });
  });
});
