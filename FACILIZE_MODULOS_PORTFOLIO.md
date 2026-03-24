# Facilize – Documentação Completa dos Módulos

Documento de referência para a plataforma **Facilize**, sistema de gestão completo para prestadores de serviços (beleza, saúde, consultoria e afins). Contém todos os módulos e suas funcionalidades, útil para portfólio e apresentação técnica.

> **Confidencialidade:** Evite publicar este arquivo integralmente em repositórios ou sites abertos. Listas extensas de **rotas REST**, **paths de health/métricas**, **árvore de URLs de admin** e nomes de endpoints facilitam mapeamento da superfície de ataque. Para divulgação pública, prefira o estudo de caso do site (textos genéricos) ou uma versão deste documento **sem** enumeração de URLs.

---

## Índice

1. [Visão Geral e Arquitetura](#1-visão-geral-e-arquitetura)
2. [Core – Autenticação e Usuários](#2-core--autenticação-e-usuários)
3. [Core – Planos e Pagamentos](#3-core--planos-e-pagamentos)
4. [Agendamentos](#4-agendamentos)
5. [Serviços e Provedores](#5-serviços-e-provedores)
6. [ERP – Empresa e Funcionários](#6-erp--empresa-e-funcionários)
7. [Finanças](#7-finanças)
8. [Estoque](#8-estoque)
9. [CRM – Clientes Organizacionais](#9-crm--clientes-organizacionais)
10. [Relatórios e Analytics](#10-relatórios-e-analytics)
11. [Avaliações](#11-avaliações)
12. [Notificações e Comunicação](#12-notificações-e-comunicação)
13. [Integrações](#13-integrações)
14. [Suporte, Admin e Infraestrutura](#14-suporte-admin-e-infraestrutura)

---

## 1. Visão Geral e Arquitetura

### O que é a Facilize

Plataforma SaaS para prestadores de serviços que oferece:

- **Agendamento online** com disponibilidade em tempo real
- **Gestão financeira** (transações, contas, metas, cartão de crédito)
- **Controle de estoque** e produtos
- **CRM** para clientes organizacionais
- **ERP** para empresas com múltiplos funcionários e filiais
- **Relatórios** em PDF, CSV e Excel
- **Integrações** (Google Calendar, Stripe)

### Stack Técnico

| Camada | Tecnologia |
|--------|------------|
| API | NestJS, Prisma, PostgreSQL |
| Frontend | Next.js 15, React |
| Pagamentos | Stripe |
| Email | Nodemailer |
| Observabilidade | Prometheus, Health checks |

### Grupos de Módulos

- **Core**: Auth, User, Plan, Stripe, Payments, UserSession
- **Autônomos**: AppointmentV2, Services, Provider, Review
- **ERP**: Company, Finances, Stock, Inventory, Reports, Organizational Customers, Employee, Analytics
- **Suporte**: Notifications, Mail, Contact, Google Calendar, Email Campaign, Bug Report, Dashboard

---

## 2. Core – Autenticação e Usuários

### 2.1 Auth (Autenticação)

**Responsabilidade**: Login, registro, recuperação de senha e segurança.

| Funcionalidade | Descrição |
|----------------|-----------|
| Login | Credenciais, tokens JWT, sessão |
| Cadastro | Registro de usuário e verificação de email |
| Recuperar senha | Fluxo forgot/reset com token por email |
| 2FA | Autenticação em dois fatores |
| Google OAuth | Login com conta Google |
| Verificação de perfis | Checagem de admin, funcionário, prestador |

**Rotas:** fluxos sob namespaces autenticados da API (login, registro, recuperação de senha, 2FA, OAuth e verificações de perfil). **URLs exatas omitidas** em cópias públicas.

### 2.2 User (Usuários)

**Responsabilidade**: CRUD de usuários, perfil, avatar.

| Funcionalidade | Descrição |
|----------------|-----------|
| CRUD usuários | Criação, listagem, atualização, exclusão |
| Perfil | Nome, email, avatar, preferências |
| Avatar | Upload e atualização de foto de perfil |
| Operações sensíveis | Alteração de senha, recuperação |

**Rotas**: `/users/*`

### 2.3 User Session (Sessões)

**Responsabilidade**: Controle de sessões e dispositivos.

| Funcionalidade | Descrição |
|----------------|-----------|
| Sessões ativas | Listagem de dispositivos conectados |
| Logout remoto | Encerrar sessão em outros dispositivos |
| Auditoria | Registro de IP, dispositivo, localização no login |

**Rotas**: `/user-sessions/*`

---

## 3. Core – Planos e Pagamentos

### 3.1 Plan (Planos)

**Responsabilidade**: Planos de assinatura e features por plano.

| Funcionalidade | Descrição |
|----------------|-----------|
| Listar planos | Planos disponíveis e preços |
| Features por plano | Limites (agendamentos, funcionários, estoque, emissão de notas, etc.) |
| Uso atual | Verificar limites do plano do usuário |
| Checkout | Fluxo de assinatura via Stripe |

**Rotas**: `/plans/*`

### 3.2 Billing (Cobrança)

**Responsabilidade**: Histórico de cobranças e faturas.

| Funcionalidade | Descrição |
|----------------|-----------|
| Histórico | Lista de faturas e pagamentos |
| Detalhes da fatura | Download de faturas |
| Métodos de pagamento | Gerenciar cartões e formas de cobrança |

**Rotas**: `/billing/*`

### 3.3 Stripe

**Responsabilidade**: Integração com Stripe.

| Funcionalidade | Descrição |
|----------------|-----------|
| Checkout Session | Criar sessão de pagamento |
| Customer Portal | Portal de gerenciamento da assinatura |
| Webhook | Receber eventos (pagamento, assinatura, cancelamento) e atualizar status |

**Rotas:** integração REST com o provedor de pagamentos; **webhook assinado** para eventos de cobrança e assinatura. URLs exatas omitidas em documentação pública.

### 3.4 Payments (Pagamentos)

**Responsabilidade**: Processamento de cobranças e assinaturas.

| Funcionalidade | Descrição |
|----------------|-----------|
| Charges | Cobranças via Stripe API |
| Subscriptions | Criação e gerenciamento de assinaturas |
| Sincronização | Atualização do status de assinatura a partir do webhook |

---

## 4. Agendamentos

### 4.1 Appointment V2 (Principal)

**Responsabilidade**: Agendamentos em tempo real, status e integrações.

| Funcionalidade | Descrição |
|----------------|-----------|
| CRUD agendamentos | Criar, listar, atualizar, cancelar |
| Disponibilidade | Horários disponíveis por dia/funcionário |
| Status | PENDING, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED, NO_SHOW |
| Estatísticas | Contagem por status, período |
| Compromissos pessoais | Bloqueios de horário do prestador |
| Serviços por funcionário | Vínculo entre funcionário e serviços oferecidos |
| Serviços baseados em horas | Preço calculado pela duração real do serviço |
| Duração real | Campo `actualDuration` e `calculatedPrice` pós-serviço |

**Integrações automáticas ao concluir/cancelar**:
- **Finanças**: Cria transações INCOME/EXPENSE ou marca como CANCELLED
- **Estoque/Inventário**: Baixa ou devolve produtos conforme acesso à empresa
- **Comissões**: Calcula comissão do funcionário via Company
- **CRM**: Cria/vincula OrganizationalCustomer, CustomerAppointment e CustomerService
- **Notificações**: Alerta criação e mudança de status

**Rotas**: `/appointments/*`

### 4.2 Appointment (Legado)

**Responsabilidade**: Mesmas funcionalidades da V2, mantido para compatibilidade.

**Rotas**: `/old_appointments/*`

---

## 5. Serviços e Provedores

### 5.1 Services (Serviços)

**Responsabilidade**: Catálogo de serviços oferecidos.

| Funcionalidade | Descrição |
|----------------|-----------|
| CRUD serviços | Nome, descrição, preço, duração |
| Categorias | Agrupamento de serviços |
| Preço fixo ou por hora | Suporte a serviços cobrados por tempo |
| Duração base | Em minutos, usada no cálculo de disponibilidade |

**Rotas**: `/services/*`

### 5.2 Provider (Provedor)

**Responsabilidade**: Perfil público e configurações do prestador.

| Funcionalidade | Descrição |
|----------------|-----------|
| Perfil público | Nome, foto, descrição, endereço |
| Serviços oferecidos | Associação com Services |
| Disponibilidade | Horários de atendimento |
| Página de agendamento | URL pública para clientes agendarem |

**Rotas**: `/providers/*`

---

## 6. ERP – Empresa e Funcionários

### 6.1 Company (Empresa)

**Responsabilidade**: Multi-tenant, filiais, permissões e estrutura da empresa.

| Funcionalidade | Descrição |
|----------------|-----------|
| CRUD empresas | Nome, CNPJ, endereço, configurações |
| Filiais (Branches) | Múltiplas unidades |
| Permissões | Controle granular por recurso (agendamentos, estoque, finanças, etc.) |
| Onboarding | Fluxo de cadastro inicial da empresa |
| Organização | Departamentos e hierarquia |
| Medium/Large Company | Funcionalidades específicas para empresas maiores |

**Rotas**: `/companies/*`, `/companies/:companyId/branches`, `/companies/:companyId/permissions`, `/company-organization`, `/company-onboarding`, `/medium-company`, `/large-company`

### 6.2 Employee (Funcionários)

**Responsabilidade**: Gestão de colaboradores e integração com agenda.

| Funcionalidade | Descrição |
|----------------|-----------|
| CRUD funcionários | Nome, email, departamento, vínculo com User |
| Disponibilidade | Horários de atendimento por dia da semana |
| Bloqueios de horário (Time Blocks) | Pausa almoço, férias, atestado (LUNCH_BREAK, VACATION, SICK_LEAVE, CUSTOM) |
| Bloqueios recorrentes | Ex.: almoço diário 12h–13h |
| Serviços por funcionário | Quais serviços cada um pode prestar |
| Comissões | Regras por funcionário e por serviço (PERCENTAGE, FIXED, HYBRID) |
| Histórico de comissões | Status PENDING, PAID, CANCELLED |
| Caixa por funcionário | Abertura/fechamento diário, recebimentos por método |
| Avaliações | Reviews específicas do funcionário |
| Ranking | Rankings de performance |
| Metas de vendas | Sales goals por período |

**Rotas**: `/employee/*`, `/companies/:companyId/employees/*`, `/employee-dashboard`, `/employee-cash-register`

### 6.3 Company Schedule (Agenda Multi-Coluna)

**Responsabilidade**: Visualização estilo Google Calendar para empresas.

| Funcionalidade | Descrição |
|----------------|-----------|
| Multi-view | Agendamentos de múltiplos funcionários lado a lado |
| Filtros | Por funcionário, departamento, data |
| Disponibilidade e bloqueios | Inclusão na visualização |

**Rotas**: `/companies/:companyId/schedule/multi-view`

### 6.4 Inventory (Inventário Empresarial)

**Responsabilidade**: Estoque por filial quando a empresa usa o módulo Company.

| Funcionalidade | Descrição |
|----------------|-----------|
| Itens por filial | InventoryItem, InventoryMovement |
| Integração AppointmentV2 | Baixa (OUT) na conclusão, devolução (RETURN) no cancelamento |

**Rotas**: `/companies/:companyId/inventory`

### 6.5 Audit Log, Sales Goals, CRMSettings

| Recurso | Descrição |
|---------|-----------|
| Audit Log | Registro de ações na empresa |
| Sales Goals | Metas de vendas por empresa |
| CRMSettings | Configurações de CRM da empresa |

**Rotas**: `/companies/:companyId/audit-logs`, `/companies/:companyId/sales-goals`, `/companies/:companyId/crm-settings`

---

## 7. Finanças

**Responsabilidade**: Gestão financeira (transações, contas, categorias, metas, lembretes, cartão de crédito, emissão de notas).

### 7.1 Transações

| Funcionalidade | Descrição |
|----------------|-----------|
| CRUD transações | INCOME, EXPENSE com conta, categoria, valor |
| Transações futuras | Agendamento para data futura |
| Parcelas | Listagem de parcelas de transação pai |
| Criptografia | Dados sensíveis criptografados |
| Atualização de saldo | Automática na conta ao criar/atualizar/deletar |

### 7.2 Contas

| Funcionalidade | Descrição |
|----------------|-----------|
| CRUD contas | Carteira, banco, cartão, investimento |
| Saldo por período | Contas com saldo no período |
| Conta padrão | Conta default do usuário |

### 7.3 Categorias e Metas

| Funcionalidade | Descrição |
|----------------|-----------|
| Categorias | INCOME/EXPENSE, padrão ou personalizadas |
| Metas financeiras | Objetivos com prazo e valor alvo |
| Contribuições | Adicionar contribuições à meta |
| Progresso | Cálculo de progresso da meta |

### 7.4 Lembretes de Pagamento

| Funcionalidade | Descrição |
|----------------|-----------|
| CRUD lembretes | A receber / a pagar |
| Marcar como concluído | Cria transação automática, suporte a recorrentes |
| Notificações | Email e in-app |

### 7.5 Cartão de Crédito

| Funcionalidade | Descrição |
|----------------|-----------|
| Cadastro de cartões | Limite, fechamento, vencimento |
| Crédito disponível | Limite menos transações pendentes |
| Faturas mensais | Geração e listagem |
| Pagar fatura | Registrar pagamento |
| Alertas de limite | Notificação quando limite próximo |

### 7.6 Relatórios e Exportação

| Funcionalidade | Descrição |
|----------------|-----------|
| Resumo financeiro | Total receitas, despesas, saldo |
| Por categoria | Gastos/receitas por categoria |
| Mensal | Resumo do mês |
| Fluxo de caixa | Por N meses |
| Exportar CSV | Download de transações |

### 7.7 Emissão de Notas Fiscais

| Funcionalidade | Descrição |
|----------------|-----------|
| Emitir nota | Em ambiente dev, com verificação de limite do plano |
| Rastreamento de uso | Integração com Plan/UsageTracking |

**Rotas**: `/finances/*`, `/finances/credit-cards/*`, `/invoice-emission/*`

---

## 8. Estoque

**Responsabilidade**: Produtos e movimentações para prestadores sem Company (uso do Stock tradicional).

| Funcionalidade | Descrição |
|----------------|-----------|
| CRUD produtos | Nome, SKU, quantidade, preço |
| Movimentações | ENTRADA, SAÍDA, AJUSTE |
| Integração Finanças | IN → EXPENSE, OUT → INCOME |
| Integração AppointmentV2 | Baixa na conclusão, devolução no cancelamento |

**Rotas**: `/stock/*`

---

## 9. CRM – Clientes Organizacionais

**Responsabilidade**: CRM leve para clientes não-digitais (walk-in, telefone, legados).

### 9.1 OrganizationalCustomer

| Funcionalidade | Descrição |
|----------------|-----------|
| CRUD clientes | Nome, email, telefone, CPF/CNPJ, endereço |
| Tipo | INDIVIDUAL ou ORGANIZATION |
| Status | ACTIVE, INACTIVE, PENDING_APPROVAL, REJECTED, SUSPENDED |
| Tags e customFields | Categorização e campos personalizados |
| lastContactDate | Atualizado automaticamente |
| totalRevenue / totalTransactions | Atualizados via CustomerService e transações |

### 9.2 CustomerNote

| Funcionalidade | Descrição |
|----------------|-----------|
| Notas por cliente | Título, conteúdo, tipo (GENERAL, FOLLOW_UP, ACTION_ITEM, ISSUE, IDEA, QUESTION) |
| Privacidade | Notas privadas |
| Anexos e tags | Suporte a anexos e tags |

### 9.3 CustomerInteraction

| Funcionalidade | Descrição |
|----------------|-----------|
| Registro de interações | CALL, EMAIL, MEETING, CHAT, OTHER |
| Follow-up | Data e obrigatoriedade de acompanhamento |
| Resultado e duração | outcome e duration em minutos |

### 9.4 CustomerService e CustomerProduct

| Recurso | Descrição |
|---------|-----------|
| CustomerService | Serviços prestados ao cliente (data, quantidade, preço, status) |
| CustomerProduct | Produtos vendidos ao cliente |

### 9.5 Faturas e Transações

| Recurso | Descrição |
|---------|-----------|
| CustomerTransaction | Transações manuais ligadas ao cliente |
| CustomerInvoice | Faturas do cliente |
| Overdue Invoices | Faturas vencidas |
| Integração Finanças | Transações criadas em Finances |

### 9.6 Outros Recursos

| Recurso | Descrição |
|---------|-----------|
| Follow-ups | Gestão de follow-ups |
| Upcoming Appointments | Próximos agendamentos do cliente |
| Customer Integration | Integrações externas (API) |

**Rotas**: `/organizational-customers/*`, `/organizational-customers/:customerId/notes`, `/organizational-customers/:customerId/interactions`, `/follow-ups`, `/organizational-customers/:customerId/services`, `/organizational-customers/:customerId/products`, `/organizational-customers/:customerId/transactions`, `/organizational-customers/:customerId/appointments`, `/upcoming-appointments`, `/organizational-customers/:customerId/invoices`, `/overdue-invoices`, `/customer-integration`

---

## 10. Relatórios e Analytics

### 10.1 Reports

**Responsabilidade**: Geração de relatórios em PDF, CSV e XLSX.

| Funcionalidade | Descrição |
|----------------|-----------|
| Relatórios básicos | Agendamentos, financeiro, estoque, funcionários, serviços, performance, abrangente |
| Relatórios avançados | Filtros customizados, agrupamentos, ordenação |
| Templates | Templates pré-configurados |
| Histórico | Histórico de relatórios gerados |
| Estatísticas | Uso de relatórios |

**Fontes de dados**: Finances, Stock, Company, Appointments, Google Calendar.

**Rotas**: `/reports/generate`, `/reports/generate/advanced`, `/reports/download/:filename`, `/reports/templates`, `/reports/history`, `/reports/statistics`

### 10.2 Analytics

**Responsabilidade**: Métricas e dashboards avançados.

| Funcionalidade | Descrição |
|----------------|-----------|
| Métricas agregadas | Dados de Reports e Plan |
| Uso e limites | Verificação de limites do plano |

**Rotas**: `/analytics/*`

### 10.3 Dashboard

**Responsabilidade**: Dados agregados para o dashboard do prestador.

| Funcionalidade | Descrição |
|----------------|-----------|
| Stats do provider | Métricas gerais |
| Top services | Serviços mais utilizados |
| Tendências semanais | Evolução ao longo da semana |

**Rotas**: `/dashboard/*`

### 10.4 Stats (Admin)

**Responsabilidade**: Estatísticas administrativas.

| Funcionalidade | Descrição |
|----------------|-----------|
| Dashboard admin | Visão geral da plataforma |
| Por período | Métricas por período |
| Crescimento | Indicadores de crescimento |

**Rotas**: `/stats/*`

---

## 11. Avaliações

### 11.1 Review

**Responsabilidade**: Avaliações de serviços e provedores.

| Funcionalidade | Descrição |
|----------------|-----------|
| Criar avaliação | Nota, comentário, vínculo com serviço/provedor |
| Listar avaliações | Por provedor, serviço, período |
| Média | Cálculo de média de notas |

**Rotas**: `/reviews/*`

---

## 12. Notificações e Comunicação

### 12.1 Notifications

**Responsabilidade**: Notificações in-app e por email.

| Funcionalidade | Descrição |
|----------------|-----------|
| CRUD notificações | Criar, listar, marcar como lida |
| Tipos | APPOINTMENT, PAYMENT, INVOICE, SYSTEM, CHAT, REMINDER, TRANSACTION, TAX, REVIEW_REQUEST, BUG_REPORT |
| Preferências | Configuração por tipo (email, in-app) |
| Real-time | WebSocket para atualizações em tempo real |

**Integrações**: Auth (bem-vindo), User (ops), Stripe (pagamentos), AppointmentV2 (criação e status), Finances (lembretes, transações, cartão), Bug Report, Email Campaign.

**Rotas**: `/notifications/*`

### 12.2 Mail

**Responsabilidade**: Envio de emails (nodemailer).

| Funcionalidade | Descrição |
|----------------|-----------|
| Envio | Templates e emails transacionais |
| Uso | Notificações, Auth, User, Finances, Email Campaign, Security Alerts |

### 12.3 Contact

**Responsabilidade**: Mensagens de contato/leads do site.

| Funcionalidade | Descrição |
|----------------|-----------|
| Enviar mensagem | Formulário de contato |
| Leads | Armazenamento para follow-up |

**Rotas**: `/contact/*`

### 12.4 Email Campaign

**Responsabilidade**: Campanhas de email (admin).

| Funcionalidade | Descrição |
|----------------|-----------|
| Criar campanhas | Segmentação por audiência (User) |
| Envio em massa | Via Mail |

**Rotas**: `/email-campaigns/*`

---

## 13. Integrações

### 13.1 Google Calendar

**Responsabilidade**: Sincronização com Google Calendar.

| Funcionalidade | Descrição |
|----------------|-----------|
| OAuth | Conexão com conta Google |
| Sincronização | Criação/atualização de eventos a partir dos agendamentos |
| Desconectar | Revogar acesso |

**Rotas**: `/google-calendar/*`

---

## 14. Suporte, Admin e Infraestrutura

### 14.1 Bug Report

**Responsabilidade**: Relatórios de bugs dos usuários.

| Funcionalidade | Descrição |
|----------------|-----------|
| Criar report | Descrição, steps, ambiente |
| Listar (admin) | Triagem e priorização |
| Notificações | Alertas para equipe |

**Rotas**: `/bug-reports/*`

### 14.2 Security Alerts

**Responsabilidade**: Alertas de segurança para admin.

| Funcionalidade | Descrição |
|----------------|-----------|
| Alertas | Envio de emails para administradores |
| Eventos | Logins suspeitos, falhas, etc. |

### 14.3 Health

**Responsabilidade**: Health check da API.

| Funcionalidade | Descrição |
|----------------|-----------|
| Liveness | Verificação de disponibilidade |
| Readiness | Verificação de dependências (DB, etc.) |

**Rotas:** endpoints de health em ambiente de deploy (liveness/readiness); **path exato não documentado publicamente**.

### 14.4 Metrics (Prometheus)

**Responsabilidade**: Métricas de observabilidade.

| Funcionalidade | Descrição |
|----------------|-----------|
| Métricas | Exposição em formato compatível com Prometheus em **rede/ambiente controlado** |
| Acesso | Superfície exposta apenas onde a política de deploy permitir — **sem path fixo em doc pública** |

### 14.5 Crypto

**Responsabilidade**: Criptografia de dados sensíveis.

| Funcionalidade | Descrição |
|----------------|-----------|
| Finances | Transações, contas, categorias |
| Outros | Dados sensíveis conforme necessário |

### 14.6 Cache

**Responsabilidade**: Cache de dados para performance.

| Funcionalidade | Descrição |
|----------------|-----------|
| Redis | Se configurado |
| In-memory | Fallback |

---

## Resumo Visual – Integrações Principais

```
                    ┌─────────────┐
                    │ AppointmentV2│
                    │  (Hub Central)│
                    └──────┬──────┘
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
    ┌──────────┐    ┌──────────┐    ┌──────────────┐
    │ Finances │    │ Stock/   │    │ OrgCustomers │
    │          │    │ Inventory│    │   (CRM)      │
    └──────────┘    └──────────┘    └──────────────┘
          │                │                │
          └────────────────┼────────────────┘
                           │
                    ┌──────▼──────┐
                    │ Notifications│
                    └─────────────┘
```

---

## Páginas do Frontend (visão geral — **sem listagem de URLs**)

Para reduzir fingerprinting e superfície de ataque, **não** publique enumerações completas de paths. Em alto nível:

- **Área do proprietário/prestador:** dashboards de agenda, serviços, finanças, empresa, estoque, CRM, relatórios, analytics, equipe, avaliações, planos, notificações, perfil, configurações e ferramentas fiscais onde aplicável.
- **Portal do funcionário:** agendamentos, disponibilidade, comissões, avaliações, rankings, metas, CRM operacional, caixa, estoque e relatórios.
- **Área administrativa (operadores da plataforma):** gestão de usuários, empresas, planos, suporte (ex.: bugs e mensagens), campanhas e visão operacional — **rotas internas não listadas aqui em versões públicas**.
- **Páginas públicas:** landing, agendamento pelo link do prestador, marketing (planos, recursos, FAQ, institucional), contato e páginas legais.

---

*Documento gerado para uso em portfólio e documentação técnica da Facilize. Mantenha enumerações de rotas apenas em ambientes privados ou com controle de acesso.*
