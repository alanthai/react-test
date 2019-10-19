import BuyerSearchForm from '../components/buyer-search-form';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { GlobalStyle } from '../styles/globals';

const Index = () => (
  <div>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <BuyerSearchForm />
    </ThemeProvider>
  </div>
);

export default Index;
