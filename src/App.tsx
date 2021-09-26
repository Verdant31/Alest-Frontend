import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Route, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthContextProvider } from './contexts/AuthContext';
import { EditProduct } from './pages/EditProduct';

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>

          <Route path="/" exact component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/editproduct/:id" component={EditProduct} />

        </QueryClientProvider>

      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
