import { useState, useEffect } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "../components/ui/dialog";

export default function AdminDashboard({ onLogout, onNavigate }) {
  const [activeTab, setActiveTab] = useState("users");
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserProfile, setNewUserProfile] = useState("");
  const [users, setUsers] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    brand: "",
    category: "",
    volume: "",
    price: ""
  });
  const [products, setProducts] = useState([]);

  const [newPdv, setNewPdv] = useState({
    name: "",
    cnpj: "",
    address: "",
    city: "",
    state: "",
    manager: "",
    phone: "",
    email: "",
    photo: "",
    operating_hours: {
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: ""
    }
  });
  const [pdvs, setPdvs] = useState([]);

  useEffect(() => {
    // Load data from localStorage or a mock API
    const storedUsers = JSON.parse(localStorage.getItem("adminUsers")) || [];
    const storedProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];
    const storedPdvs = JSON.parse(localStorage.getItem("adminPdvs")) || [];

    // Se não há dados armazenados, usar dados de exemplo
    if (storedUsers.length === 0) {
      const exampleUsers = [
        { id: 1, name: "João Silva", email: "joao@tradelite.com", profile: "Promotor", status: "Ativo" },
        { id: 2, name: "Maria Santos", email: "maria@tradelite.com", profile: "Gestor", status: "Ativo" },
        { id: 3, name: "Pedro Costa", email: "pedro@tradelite.com", profile: "Promotor", status: "Ativo" },
        { id: 4, name: "Ana Oliveira", email: "ana@tradelite.com", profile: "Gestor", status: "Inativo" }
      ];
      setUsers(exampleUsers);
      localStorage.setItem("adminUsers", JSON.stringify(exampleUsers));
    } else {
      setUsers(storedUsers);
    }

    if (storedProducts.length === 0) {
      const exampleProducts = [
        { id: 1, name: "Coca-Cola 2L", sku: "CC2L001", brand: "Coca-Cola", category: "Refrigerantes", volume: "2L", price: "R$ 8,99" },
        { id: 2, name: "Pepsi 350ml", sku: "PP350001", brand: "Pepsi", category: "Refrigerantes", volume: "350ml", price: "R$ 3,50" },
        { id: 3, name: "Água Mineral 500ml", sku: "AM500001", brand: "Crystal", category: "Águas", volume: "500ml", price: "R$ 2,00" },
        { id: 4, name: "Suco de Laranja 1L", sku: "SL1L001", brand: "Del Valle", category: "Sucos", volume: "1L", price: "R$ 6,50" }
      ];
      setProducts(exampleProducts);
      localStorage.setItem("adminProducts", JSON.stringify(exampleProducts));
    } else {
      setProducts(storedProducts);
    }

    if (storedPdvs.length === 0) {
      const examplePdvs = [
        { 
          id: 1, 
          name: "Supermercado Exemplo", 
          cnpj: "12.345.678/0001-90", 
          address: "Rua das Flores, 123", 
          city: "São Paulo", 
          state: "SP", 
          manager: "Carlos Silva", 
          phone: "(11) 99999-9999", 
          email: "contato@superexemplo.com",
          status: "Ativo"
        },
        { 
          id: 2, 
          name: "Mercado Central", 
          cnpj: "98.765.432/0001-10", 
          address: "Av. Principal, 456", 
          city: "Rio de Janeiro", 
          state: "RJ", 
          manager: "Fernanda Costa", 
          phone: "(21) 88888-8888", 
          email: "contato@mercadocentral.com",
          status: "Ativo"
        },
        { 
          id: 3, 
          name: "Loja Norte", 
          cnpj: "11.222.333/0001-44", 
          address: "Rua Norte, 789", 
          city: "Belo Horizonte", 
          state: "MG", 
          manager: "Roberto Santos", 
          phone: "(31) 77777-7777", 
          email: "contato@lojanorte.com",
          status: "Ativo"
        }
      ];
      setPdvs(examplePdvs);
      localStorage.setItem("adminPdvs", JSON.stringify(examplePdvs));
    } else {
      setPdvs(storedPdvs);
    }
  }, []);

  const handleAddUser = () => {
    const newUser = { id: Date.now(), name: newUserName, email: newUserEmail, password: newUserPassword, profile: newUserProfile };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("adminUsers", JSON.stringify(updatedUsers));
    setNewUserName("");
    setNewUserEmail("");
    setNewUserPassword("");
    setNewUserProfile("");
  };

  const handleAddProduct = () => {
    const productToAdd = { id: Date.now(), ...newProduct };
    const updatedProducts = [...products, productToAdd];
    setProducts(updatedProducts);
    localStorage.setItem("adminProducts", JSON.stringify(updatedProducts));
    setNewProduct({
      name: "",
      sku: "",
      brand: "",
      category: "",
      volume: "",
      price: ""
    });
  };

  const handleAddPdv = () => {
    const pdvToAdd = { id: Date.now(), ...newPdv };
    const updatedPdvs = [...pdvs, pdvToAdd];
    setPdvs(updatedPdvs);
    localStorage.setItem("adminPdvs", JSON.stringify(updatedPdvs));
    setNewPdv({
      name: "",
      cnpj: "",
      address: "",
      city: "",
      state: "",
      manager: "",
      phone: "",
      email: "",
      photo: "",
      operating_hours: {
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: ""
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">PAINEL ADMINISTRATIVO</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Bem-vindo, Admin User</span>
          <Button onClick={onLogout} variant="secondary">Sair</Button>
          <Button onClick={() => onNavigate("support")} variant="secondary">Suporte</Button>
        </div>
      </header>

      <main className="flex-1 p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="pdvs">PDVs</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="finance">Financeiro</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Usuários</CardTitle>
                <CardDescription>Adicione, edite ou remova usuários do sistema.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="userName">Nome</Label>
                    <Input id="userName" placeholder="Nome completo" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="userEmail">Email</Label>
                    <Input id="userEmail" placeholder="email@exemplo.com" value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="userProfile">Perfil</Label>
                    <Select onValueChange={setNewUserProfile} value={newUserProfile}>
                      <SelectTrigger id="userProfile">
                        <SelectValue placeholder="Selecione o perfil" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="promotor">Promotor</SelectItem>
                        <SelectItem value="gestor">Gestor</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="userPassword">Senha</Label>
                    <Input id="userPassword" type="password" placeholder="••••••••" value={newUserPassword} onChange={(e) => setNewUserPassword(e.target.value)} />
                  </div>
                </div>
                <Button onClick={handleAddUser}>Adicionar Usuário</Button>

                <h3 className="text-lg font-semibold mt-6">Usuários Cadastrados</h3>
                <div className="border rounded-md p-4">
                  {users.length === 0 ? (
                    <p className="text-gray-500">Nenhum usuário cadastrado.</p>
                  ) : (
                    <ul className="space-y-2">
                      {users.map(user => (
                        <li key={user.id} className="flex justify-between items-center">
                          <span>{user.name} ({user.profile}) - {user.email}</span>
                          <Button variant="destructive" size="sm">Remover</Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pdvs" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar PDVs</CardTitle>
                <CardDescription>Adicione, edite ou remova pontos de venda.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pdvName">Nome do PDV</Label>
                    <Input id="pdvName" placeholder="Nome do Ponto de Venda" value={newPdv.name} onChange={(e) => setNewPdv(prev => ({ ...prev, name: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="pdvCnpj">CNPJ</Label>
                    <Input id="pdvCnpj" placeholder="XX.XXX.XXX/XXXX-XX" value={newPdv.cnpj} onChange={(e) => setNewPdv(prev => ({ ...prev, cnpj: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="pdvAddress">Endereço</Label>
                    <Input id="pdvAddress" placeholder="Rua, Número, Bairro" value={newPdv.address} onChange={(e) => setNewPdv(prev => ({ ...prev, address: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="pdvCity">Cidade</Label>
                    <Input id="pdvCity" placeholder="Cidade" value={newPdv.city} onChange={(e) => setNewPdv(prev => ({ ...prev, city: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="pdvState">Estado</Label>
                    <Input id="pdvState" placeholder="Estado" value={newPdv.state} onChange={(e) => setNewPdv(prev => ({ ...prev, state: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="pdvManager">Gerente</Label>
                    <Input id="pdvManager" placeholder="Nome do Gerente" value={newPdv.manager} onChange={(e) => setNewPdv(prev => ({ ...prev, manager: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="pdvPhone">Telefone</Label>
                    <Input id="pdvPhone" placeholder="(XX) XXXX-XXXX" value={newPdv.phone} onChange={(e) => setNewPdv(prev => ({ ...prev, phone: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="pdvEmail">Email do PDV</Label>
                    <Input id="pdvEmail" placeholder="email@pdv.com" value={newPdv.email} onChange={(e) => setNewPdv(prev => ({ ...prev, email: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="pdvPhoto">Foto da Fachada (URL)</Label>
                    <Input id="pdvPhoto" placeholder="URL da foto" value={newPdv.photo} onChange={(e) => setNewPdv(prev => ({ ...prev, photo: e.target.value }))} />
                  </div>
                </div>
                <h4 className="text-md font-semibold mt-4">Horário de Funcionamento</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="operating_hours_monday">Segunda</Label>
                    <Input id="operating_hours_monday" placeholder="08:00-18:00" value={newPdv.operating_hours.monday} onChange={(e) => setNewPdv(prev => ({ ...prev, operating_hours: { ...prev.operating_hours, monday: e.target.value } }))} />
                  </div>
                  <div>
                    <Label htmlFor="operating_hours_tuesday">Terça</Label>
                    <Input id="operating_hours_tuesday" placeholder="08:00-18:00" value={newPdv.operating_hours.tuesday} onChange={(e) => setNewPdv(prev => ({ ...prev, operating_hours: { ...prev.operating_hours, tuesday: e.target.value } }))} />
                  </div>
                  <div>
                    <Label htmlFor="operating_hours_wednesday">Quarta</Label>
                    <Input id="operating_hours_wednesday" placeholder="08:00-18:00" value={newPdv.operating_hours.wednesday} onChange={(e) => setNewPdv(prev => ({ ...prev, operating_hours: { ...prev.operating_hours, wednesday: e.target.value } }))} />
                  </div>
                  <div>
                    <Label htmlFor="operating_hours_thursday">Quinta</Label>
                    <Input id="operating_hours_thursday" placeholder="08:00-18:00" value={newPdv.operating_hours.thursday} onChange={(e) => setNewPdv(prev => ({ ...prev, operating_hours: { ...prev.operating_hours, thursday: e.target.value } }))} />
                  </div>
                  <div>
                    <Label htmlFor="operating_hours_friday">Sexta</Label>
                    <Input id="operating_hours_friday" placeholder="08:00-18:00" value={newPdv.operating_hours.friday} onChange={(e) => setNewPdv(prev => ({ ...prev, operating_hours: { ...prev.operating_hours, friday: e.target.value } }))} />
                  </div>
                  <div>
                    <Label htmlFor="operating_hours_saturday">Sábado</Label>
                    <Input id="operating_hours_saturday" placeholder="08:00-12:00" value={newPdv.operating_hours.saturday} onChange={(e) => setNewPdv(prev => ({ ...prev, operating_hours: { ...prev.operating_hours, saturday: e.target.value } }))} />
                  </div>
                  <div>
                    <Label htmlFor="operating_hours_sunday">Domingo</Label>
                    <Input id="operating_hours_sunday" placeholder="Fechado" value={newPdv.operating_hours.sunday} onChange={(e) => setNewPdv(prev => ({ ...prev, operating_hours: { ...prev.operating_hours, sunday: e.target.value } }))} />
                  </div>
                </div>
                <Button onClick={handleAddPdv}>Adicionar PDV</Button>

                <h3 className="text-lg font-semibold mt-6">PDVs Cadastrados</h3>
                <div className="border rounded-md p-4">
                  {pdvs.length === 0 ? (
                    <p className="text-gray-500">Nenhum PDV cadastrado.</p>
                  ) : (
                    <ul className="space-y-2">
                      {pdvs.map(pdv => (
                        <li key={pdv.id} className="flex justify-between items-center">
                          <span>{pdv.name} - {pdv.city}/{pdv.state}</span>
                          <Button variant="destructive" size="sm">Remover</Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Produtos</CardTitle>
                <CardDescription>Adicione, edite ou remova produtos do catálogo.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="productName">Nome do Produto</Label>
                    <Input id="productName" placeholder="Nome do Produto" value={newProduct.name} onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="productSku">SKU</Label>
                    <Input id="productSku" placeholder="SKU" value={newProduct.sku} onChange={(e) => setNewProduct(prev => ({ ...prev, sku: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="productBrand">Marca</Label>
                    <Input id="productBrand" placeholder="Marca" value={newProduct.brand} onChange={(e) => setNewProduct(prev => ({ ...prev, brand: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="productCategory">Categoria</Label>
                    <Input id="productCategory" placeholder="Categoria" value={newProduct.category} onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="productVolume">Volume/Peso</Label>
                    <Input id="productVolume" placeholder="Ex: 350ml, 1kg" value={newProduct.volume} onChange={(e) => setNewProduct(prev => ({ ...prev, volume: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="productPrice">Preço Sugerido</Label>
                    <Input id="productPrice" placeholder="R$ XX.XX" value={newProduct.price} onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))} />
                  </div>
                </div>
                <Button onClick={handleAddProduct}>Adicionar Produto</Button>

                <h3 className="text-lg font-semibold mt-6">Produtos Cadastrados</h3>
                <div className="border rounded-md p-4">
                  {products.length === 0 ? (
                    <p className="text-gray-500">Nenhum produto cadastrado.</p>
                  ) : (
                    <ul className="space-y-2">
                      {products.map(product => (
                        <li key={product.id} className="flex justify-between items-center">
                          <span>{product.name} ({product.brand}) - {product.sku}</span>
                          <Button variant="destructive" size="sm">Remover</Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="finance" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Financeiro</CardTitle>
                <CardDescription>Visualize mensalidades e formas de pagamento.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold">Mensalidade Atual</h3>
                <p className="text-2xl font-bold">R$ 299,90 / mês</p>

                <h3 className="text-lg font-semibold mt-6">Formas de Pagamento</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Input type="radio" id="creditCard" name="paymentMethod" value="creditCard" className="w-4 h-4" />
                    <Label htmlFor="creditCard">Cartão de Crédito</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input type="radio" id="bankTransfer" name="paymentMethod" value="bankTransfer" className="w-4 h-4" />
                    <Label htmlFor="bankTransfer">Transferência Bancária</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input type="radio" id="boleto" name="paymentMethod" value="boleto" className="w-4 h-4" />
                    <Label htmlFor="boleto">Boleto Bancário</Label>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mt-6">Histórico de Pagamentos</h3>
                <div className="border rounded-md p-4">
                  <p className="text-gray-500">Nenhum histórico de pagamento disponível.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

