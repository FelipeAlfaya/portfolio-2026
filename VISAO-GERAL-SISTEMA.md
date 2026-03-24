# Visão geral do sistema (público / não confidencial)

Este documento descreve, em alto nível, a arquitetura, as tecnologias e os padrões adotados. **Não** inclui dados de pacientes, credenciais, URLs de produção, regras clínicas detalhadas nem qualquer informação que permita identificar pessoas ou casos reais.

---

## Objetivo do produto (resumo)

Aplicação web para **gestão de informações de acompanhamento** em contexto esportivo/clínico: cadastros, evolução ao longo do tempo, registros de avaliação e **documentação formal de encerramento** quando aplicável. O foco é uso interno por equipe autorizada, com controle de acesso por perfil.

---

## Arquitetura em duas camadas

| Camada | Papel |
|--------|--------|
| **Interface (SPA/SSR híbrido)** | Navegação, formulários, listagens, consumo da API via HTTP. |
| **API REST** | Autenticação, validação, regras de negócio, persistência e geração de artefatos (ex.: exportações). |

Comunicação: **JSON** sobre HTTPS em ambiente real; o endereço da API é configurado por variável de ambiente no front (sem fixar host neste documento).

---

## Tecnologias principais

### Interface (`relatorio-ui`)

- **Next.js** (App Router) e **React** — páginas, layouts e componentes.
- **TypeScript** — tipagem compartilhada com contratos da API no cliente.
- **Tailwind CSS v4** — estilização utilitária e tokens visuais centralizados (cores, superfícies, foco em consistência e leitura).
- **Biome** — lint e formatação.
- **lucide-react** — ícones vetoriais consistentes com o restante da UI.

### API (`relatorio-api`)

- **NestJS** — módulos por domínio (usuários, autenticação, entidades de negócio, relatórios, regras auxiliares).
- **Prisma** — ORM e migrações sobre **PostgreSQL**.
- **Passport + JWT** — autenticação stateless; payload mínimo no token (identificador, e-mail, perfil).
- **bcrypt** — armazenamento seguro de senhas (hash).
- **class-validator / class-transformer** — validação de entrada nos DTOs.
- **PDFKit** e **ExcelJS** — geração de documentos e planilhas para exportação, quando previsto pelo fluxo.

### Ferramentas de desenvolvimento

- **Yarn** como gerenciador de pacotes no front.
- Seed e scripts Prisma para ambiente de desenvolvimento (sem dados reais neste repositório como premissa).

---

## Segurança e confidencialidade (visão de solução)

- **Autenticação obrigatória** para áreas restritas; sessão baseada em **token** no cliente, enviado no cabeçalho `Authorization`.
- **Papéis de usuário** (administrador, profissional, leitor) com **autorização no servidor** — o front apenas adapta a UI; a API aplica os guardas de perfil.
- **Redirecionamento para login** quando a API responde não autorizado, limpando credenciais locais obsoletas.
- Dados sensíveis devem trafegar apenas em canais seguros (TLS), com políticas de backup e acesso alinhadas à LGPD e ao uso institucional — **detalhes operacionais ficam fora deste arquivo**.

---

## Soluções de produto e engenharia (alto nível)

### Modelagem de dados

Esquema relacional com entidades para **pessoas acompanhadas**, **episódios de acompanhamento**, fases de reabilitação, **testes e métricas** (laboratório/campo e indicadores clínicos), e **relatórios de alta** vinculados a regras de consistência. Enumerações no banco garantem valores controlados para tipos e estados.

### Regras de “prontidão” e relatórios

A API encapsula **estratégias por contexto** (padrão Strategy) para avaliar critérios de encerramento sem acoplar um único bloco monolítico — facilita manutenção e extensão. Os relatórios formalizam o resultado desse processo.

### Interface do usuário

- **Layout** com área de navegação lateral estável no desktop e conteúdo rolável.
- **Componentes reutilizáveis** (formulários, tabelas, modais, campos) e **controles de lista customizados** (ex.: dropdown acessível com teclado e animação discreta), priorizando **UX** e **acessibilidade** (foco visível, redução de movimento quando o usuário prefere, padrões de diálogo).
- **Dashboard** com visão sintética de indicadores agregados (sem expor métricas específicas neste texto).

### Integração front ↔ API

Cliente HTTP centralizado: monta URL base a partir de configuração, anexa o token, trata erros e mensagens da API de forma uniforme. Tipos TypeScript no front espelham as respostas principais para reduzir divergência com o contrato REST.

---

## O que este documento não cobre (de propósito)

- Nomes de instituições, atletas ou profissionais.
- Valores reais de exames, datas de casos ou conteúdo de relatórios.
- Segredos (`DATABASE_URL`, chaves JWT, etc.) — devem permanecer apenas em `.env` e cofres adequados.
- Procedimentos clínicos ou protocolos terapêuticos detalhados.

---

## Manutenção deste arquivo

Atualize apenas a **camada conceitual** (stack, padrões, módulos). Para mudanças de domínio sensível, prefira documentação interna com controle de acesso, não versionada em repositórios públicos sem revisão.
