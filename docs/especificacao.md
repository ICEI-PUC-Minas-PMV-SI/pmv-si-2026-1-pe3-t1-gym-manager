# 3. DOCUMENTO DE ESPECIFICAÇÃO DE REQUISITOS DE SOFTWARE

Nesta parte do trabalho é detalhada a documentação dos requisitos do sistema proposto de acordo com as seções a seguir.

## 3.1 Objetivos deste documento
Descrever e especificar as necessidades operacionais e administrativas de academias de pequeno e médio porte que devem ser atendidas pelo desenvolvimento do Sistema de Gerenciamento para Academias.

## 3.2 Escopo do produto

### 3.2.1 Nome do produto e seus componentes principais
O produto será denominado Gym Manager. Ele será composto por um módulo administrativo centralizado com os elementos necessários à gestão do negócio, englobando o controle de usuários (funcionários), cadastro de instrutores, gestão de modalidades, turmas e aulas, além da emissão de relatórios gerenciais e dashboards.

### 3.2.2 Missão do produto
Substituir o uso de métodos manuais e planilhas genéricas por uma plataforma digital centralizada , visando otimizar a organização interna, reduzir o retrabalho e fornecer dados confiáveis para a tomada de decisões estratégicas por parte dos gestores.

### 3.2.3 Limites do produto
O sistema operará de forma estrita como uma ferramenta de  backoffice. Sendo assim, o sistema não fornece interfaces de autoatendimento, aplicativo móvel ou portal de acesso direto para os alunos da academia. O uso é restrito aos funcionários logados. Além disso, o sistema não atua como um gateway de pagamento online (não processa transações de cartão de crédito ou PIX automaticamente), servindo apenas para o registro administrativo interno dessas informações.

### 3.2.4 Benefícios do produto

| # | Benefício | Valor para o Cliente |
|--------------------|------------------------------------|----------------------------------------|
|1	| Centralização e integridade dos dados |	Essencial |
|2 | Agilidade operacional | Essencial | 
|3 | Suporte à tomada de decisão | Essencial | 
|4	| Rastreabilidade organizacional	| Recomendável | 

## 3.3 Descrição geral do produto

### 3.3.1 Requisitos Funcionais

| Código | Requisito Funcional (Funcionalidade) | Descrição |
|--------------------|------------------------------------|----------------------------------------|
| RF01 | Realizar Autenticação |	O sistema deve permitir o login e logout de usuários (funcionários) mediante credenciais seguras, direcionando-os para suas respectivas áreas de acesso |
| RF02 |	Gerenciar Usuários do Sistema	| O sistema deve permitir cadastrar, consultar, editar e excluir (ou inativar) usuários que terão acesso à plataforma (ex: Administrador, Recepcionista), definindo seus níveis de permissão |
| RF03	| Gerenciar Instrutores |	O sistema deve permitir o cadastro de instrutores, vinculando suas especialidades e horários de trabalho |
| RF04	| Gerenciar Alunos |	O sistema deve permitir registrar os dados cadastrais dos alunos, matricular em planos, e registrar sua frequência (check-in) |
| RF05	| Gerenciar Modalidades |	O sistema deve permitir o cadastro de diferentes categorias de atividades oferecidas pela academia (ex: Musculação, Spinning, Pilates) |
| RF06	| Gerenciar Turmas |	O sistema deve permitir a criação de turmas específicas para as modalidades |
| RF07	| Gerenciar Aulas |	O sistema deve permitir o agendamento de aulas específicas, vinculando uma data/horário, a modalidade correspondente, a turma e o instrutor responsável |
| RF08	| Emitir Relatórios Gerenciais |	O sistema deve gerar relatórios estruturados e exportáveis referentes aos cadastros e às operações diárias da academia |
| RF09	| Visualizar Dashboard de Indicadores |	O sistema deve apresentar graficamente indicadores em tempo real para tomada de decisão (ex: total de aulas do dia, ocupação, alunos ativos) |
| RF10	| Gerenciar Conteúdo Informacional (Mural/Landing Page) |	O sistema deve permitir o cadastro e exibição de avisos, recomendações ou comunicados gerais para a equipe na tela inicial |
| RF11 | Gerir Configurações do Sistema |	O sistema deve permitir que utilizadores com privilégios de administrador ajustem parâmetros globais de funcionamento da plataforma |


### 3.3.2 Requisitos Não Funcionais

| Código | Requisito Não Funcional (Restrição) |
|--------------------|------------------------------------|
| RNF01 | O sistema deve possuir uma interface intuitiva de modo que um novo funcionário (recepcionista ou instrutor) seja capaz de operar as funções básicas de cadastro e consulta após um treinamento de, no máximo, 1 hora |
| RNF02 | O tempo de processamento para o carregamento da tela inicial (dashboard) e para a geração de relatórios gerenciais consolidados não deve ultrapassar 5 segundos sob condições normais de conexão |
| RNF03 |	O produto deve restringir o acesso por meio de senhas individuais e aplicar um controle de permissões baseado em papéis (RBAC), garantindo que um usuário "Recepcionista" não tenha acesso às configurações globais do perfil "Administrador" |
| RNF04 |	O sistema deve possuir um código-fonte modularizado, facilitando a identificação de falhas e a futura inclusão de novas funcionalidades pela equipe de desenvolvimento |
| RNF05 |	A arquitetura do sistema web deve ser projetada para operar 24 horas por dia, 7 dias por semana, assegurando uma taxa de disponibilidade (uptime) de 99% mensalmente |


### 3.3.3 Usuários 

| Ator | Descrição |
|--------------------|------------------------------------|
| Gestor / Administrador |	Usuário com privilégios máximos no sistema. Responsável pela tomada de decisão estratégica, possui acesso integral aos relatórios gerenciais, dashboards, configurações globais da plataforma e gestão do quadro de funcionários (recepcionistas e instrutores) |
| Recepcionista |	Usuário de nível operacional. Responsável pelo fluxo diário de front-desk, possuindo permissões para realizar o cadastro de alunos, registrar o check-in manual de presenças, matricular clientes em planos e gerenciar o agendamento de turmas e aulas |
| Instrutor |	Usuário com permissões restritas. Acessa o sistema primordialmente para fins de consulta operacional, visualizando suas próprias agendas, modalidades sob sua responsabilidade e a lista de alunos inscritos em suas respectivas aulas, sem acesso a dados financeiros ou configurações globais |

## 3.4 Modelagem do Sistema

### 3.4.1 Diagrama de Casos de Uso
Como observado no diagrama de casos de uso da Figura 1, a secretária poderá gerenciar as matrículas e professores no sistema, enquanto o coordenador, além dessas funções, poderá gerenciar os cursos de aperfeiçoamento.

#### Figura 1: Diagrama de Casos de Uso do Sistema.

<img width="800" height="1120" alt="Diagrama de caso de uso" src="https://github.com/user-attachments/assets/437ab73c-622b-4c64-8b44-e2c23d6684bf" />

 
### 3.4.2 Descrições de Casos de Uso

### CSU01 — Entrar no Sistema

**Sumário:** O funcionário da academia realiza o acesso ao sistema.

**Ator Primário:** Gestor, Recepcionista, Instrutor.  
**Ator Secundário:** Não possui.  
**Pré-condições:** O usuário deve possuir um cadastro ativo no sistema.

### Fluxo Principal
1. O usuário informa o e-mail/usuário e senha.
2. O Sistema realiza a validação das credenciais informadas.
3. Se o usuário informou a senha errada ou usuário inativo, o sistema apresenta mensagem de erro **"Credenciais Inválidas"** e o caso de uso retorna ao passo 1; caso contrário, o caso de uso termina.

**Pós-condições:** O usuário entra no sistema e é redirecionado para a tela correspondente ao seu perfil.

### CSU02 — Gerenciar Usuários

**Sumário:** O Gestor realiza a gestão (inclusão, alteração, inativação e consulta) dos perfis de acesso dos funcionários.

**Ator Primário:** Gestor.  
**Ator Secundário:** Não possui.  
**Pré-condições:** O Gestor deve estar autenticado no sistema.

### Fluxo Principal
1. O Gestor requisita a gestão de usuários.
2. O Sistema apresenta as operações que podem ser realizadas: inclusão de novo usuário, alteração de dados, inativação de acesso e consulta por nome ou CPF.
3. O Gestor seleciona a operação desejada: Inclusão, Alteração, Inativação ou Consulta, ou opta por finalizar o caso de uso.
4. Se o Gestor desejar continuar com a gestão, o caso de uso retorna ao passo 2; caso contrário, o caso de uso termina.

### Fluxo Alternativo — Inclusão
- a) O Gestor requisita a inclusão de um usuário.
- b) O Sistema apresenta uma janela solicitando Nome, CPF, E-mail, Senha Provisória e Nível de Acesso (Gestor, Recepcionista ou Instrutor).
- c) O Gestor preenche os dados e aciona o salvamento.
- d) O Sistema verifica se o CPF/E-mail já existem; se sim, exibe erro; se não, a grade listando os usuários é atualizada.

### Fluxo Alternativo — Alteração
- a) O Gestor seleciona um usuário para edição, altera os dados permitidos e requisita a atualização.
- b) O Sistema verifica a validade e altera os dados no cadastro.

### Fluxo Alternativo — Inativação
- a) O Gestor seleciona um usuário e requisita a inativação do seu acesso.
- b) O Sistema altera o status do usuário para inativo, bloqueando futuros logins.

### Fluxo Alternativo — Consulta
- a) O Gestor opta por pesquisar informando o Nome ou CPF na barra de busca.
- b) O Sistema apresenta a lista filtrada de usuários correspondentes.

**Pós-condições:** Um usuário foi incluído, alterado, inativado ou consultado no banco de dados.

### CSU03 — Gerenciar Alunos

**Sumário:** A Recepcionista realiza a gestão (inclusão, alteração, inativação, consulta) dos dados dos clientes e o registro manual de presença (check-in).

**Ator Primário:** Recepcionista.  
**Ator Secundário:** Não possui.  
**Pré-condições:** A Recepcionista deve estar autenticada no sistema.

### Fluxo Principal
1. A Recepcionista requisita a gestão de alunos.
2. O Sistema apresenta as operações que podem ser realizadas: inclusão, alteração, inativação, consulta e registro de presença.
3. A Recepcionista seleciona a operação desejada ou opta por finalizar o caso de uso.
4. Se a Recepcionista desejar continuar, o caso de uso retorna ao passo 2; caso contrário, termina.

### Fluxo Alternativo — Inclusão
- a) A Recepcionista requisita a inclusão preenchendo os dados pessoais e de contato do aluno.
- b) O Sistema valida os dados e guarda o novo registro.

### Fluxo Alternativo — Alteração / Inativação / Consulta
- a) Segue a mesma lógica do CSU02: pesquisa-se o aluno e edita-se ou inativa-se o seu cadastro.

### Fluxo Alternativo — Registro de Presença (Check-in)
- a) A Recepcionista localiza o aluno e clica em **"Registrar Presença"**.
- b) O Sistema verifica se o aluno está com o cadastro ativo. Se sim, exibe um alerta e impede o registro. Se não, vincula a presença à data e hora atuais e exibe uma confirmação de sucesso.

**Pós-condições:** O cadastro de um aluno foi modificado ou a sua presença foi registrada manualmente no sistema.

### CSU04 — Gerenciar Instrutores

**Sumário:** O Gestor realiza a manutenção dos dados dos profissionais de educação física.

**Ator Primário:** Gestor.  
**Ator Secundário:** Não possui.  
**Pré-condições:** O Gestor deve estar autenticado no sistema.

### Fluxo Principal
1. O Gestor requisita a gestão de instrutores.
2. O Sistema apresenta as operações: inclusão, alteração, inativação e consulta.
3. O Gestor seleciona a operação desejada ou finaliza.
4. Se desejar continuar, retorna ao passo 2; caso contrário, termina.

**Pós-condições:** Os dados de um instrutor foram atualizados no sistema.

### CSU05 — Gerenciar Modalidades

**Sumário:** O Gestor registra e categoriza as atividades oferecidas pela academia (ex.: Spinning, Pilates).

**Ator Primário:** Gestor.  
**Ator Secundário:** Não possui.  
**Pré-condições:** O Gestor deve estar autenticado.

### Fluxo Principal
1. O Gestor acessa o módulo de modalidades.
2. O Sistema apresenta as opções de criar nova modalidade, editar nome/descrição, ou inativar uma modalidade existente.
3. O Gestor executa a ação e o Sistema valida se o nome da modalidade já existe antes de salvar.

**Pós-condições:** O catálogo de modalidades da academia é atualizado.

### CSU06 — Gerenciar Aulas

**Sumário:** O Gestor ou a Recepcionista criam instâncias de aulas, vinculando-as a instrutores e modalidades. O Instrutor pode apenas consultar.

**Ator Primário:** Gestor, Recepcionista.  
**Ator Secundário:** Instrutor.  
**Pré-condições:** O usuário deve estar autenticado no sistema.

### Fluxo Principal
1. O Usuário requisita a gestão de aulas.
2. Se o Usuário for **Instrutor**, o Sistema apresenta apenas a operação de consulta da sua própria agenda.
3. Se o Usuário for **Gestor** ou **Recepcionista**, o Sistema apresenta as operações de Inclusão (definindo horário, local, instrutor e modalidade), Alteração, Cancelamento (Exclusão) e Consulta.
4. O usuário seleciona a operação. O Sistema valida conflitos de horário (ex.: o mesmo instrutor não pode estar em duas aulas ao mesmo tempo) e guarda a informação.

**Pós-condições:** A grade de aulas do estabelecimento é atualizada ou consultada.

### CSU07 — Gerenciar Turmas

**Sumário:** A administração cria turmas para separar os alunos por níveis de proficiência.

**Ator Primário:** Gestor, Recepcionista.  
**Ator Secundário:** Não possui.  
**Pré-condições:** Usuário autenticado.

### Fluxo Principal
1. O Usuário requisita a gestão de turmas.
2. O Sistema permite incluir uma nova turma, associando-a a uma modalidade existente e definindo o seu nível (ex.: Iniciante, Avançado).
3. O usuário também pode alocar alunos específicos a esta turma.
4. O Sistema guarda as alterações e atualiza a capacidade da turma.

**Pós-condições:** A estruturação das turmas da academia é definida e atualizada no banco de dados.

### CSU08 — Consultar Indicadores

**Sumário:** O Gestor acessa o painel visual (dashboard) para analisar o fluxo da academia.

**Ator Primário:** Gestor.  
**Ator Secundário:** Não possui.  
**Pré-condições:** Gestor autenticado no sistema.

### Fluxo Principal
1. O Gestor seleciona a tela de Dashboard.
2. O Sistema compila os dados do dia (total de check-ins, aulas ativas, alunos matriculados).
3. O Sistema renderiza gráficos e métricas com as informações solicitadas.

**Pós-condições:** O Gestor obteve uma visão macro das operações do dia.

### CSU09 — Emitir Relatórios

**Sumário:** O Gestor gera documentos estruturados com dados operacionais.

**Ator Primário:** Gestor.  
**Ator Secundário:** Não possui.  
**Pré-condições:** Gestor autenticado.

### Fluxo Principal
1. O Gestor requisita a área de relatórios.
2. O Sistema apresenta os tipos de relatórios disponíveis (Alunos, Aulas, Instrutores).
3. O Gestor seleciona o tipo e aplica filtros (ex.: intervalo de datas).
4. O Gestor clica em **"Gerar"**.
5. O Sistema processa as informações e disponibiliza a exportação do arquivo (PDF ou Excel).

**Pós-condições:** Um relatório gerencial é extraído do sistema.

### CSU10 — Gerenciar Configurações

**Sumário:** O Gestor ajusta parâmetros globais da plataforma.

**Ator Primário:** Gestor.  
**Ator Secundário:** Não possui.  
**Pré-condições:** Gestor autenticado.

### Fluxo Principal
1. O Gestor acessa o painel de configurações.
2. O Sistema exibe as variáveis globais que podem ser alteradas.
3. O Gestor modifica os dados e solicita a gravação.
4. O Sistema aplica as configurações a toda a plataforma.

**Pós-condições:** Os parâmetros globais de funcionamento foram atualizados.

### CSU11 — Gerenciar Conteúdo Informacional

**Sumário:** Permite ao Gestor cadastrar comunicados internos que serão exibidos na tela inicial de todos os funcionários da academia.

**Ator Primário:** Gestor.  
**Ator Secundário:** Recepcionista, Instrutor.  
**Pré-condições:** Usuário autenticado.

### Fluxo Principal
1. Qualquer usuário, ao entrar no sistema, visualiza o mural com os avisos ativos.
2. Apenas o Gestor possui o botão **"Novo Aviso"**.
3. O Gestor clica em **"Novo Aviso"**, insere o texto e a data de expiração, e guarda.
4. O Sistema atualiza o Mural para todos os usuários.

**Pós-condições:** A comunicação interna da academia é atualizada na página inicial.

### 3.4.3 Diagrama de Classes 

A Figura 2 mostra o diagrama de classes do sistema. A Matrícula deve conter a identificação do funcionário responsável pelo registro, bem com os dados do aluno e turmas. Para uma disciplina podemos ter diversas turmas, mas apenas um professor responsável por ela.

#### Figura 2: Diagrama de Classes do Sistema.
 
![image](https://github.com/user-attachments/assets/abc7591a-b46f-4ea2-b8f0-c116b60eb24e)


### 3.4.4 Descrições das Classes 

| # | Nome | Descrição |
|--------------------|------------------------------------|----------------------------------------|
| 1	|	Aluno |	Cadastro de informações relativas aos alunos. |
| 2	| Curso |	Cadastro geral de cursos de aperfeiçoamento. |
| 3 |	Matrícula |	Cadastro de Matrículas de alunos nos cursos. |
| 4 |	Turma |	Cadastro de turmas.
| 5	|	Professor |	Cadastro geral de professores que ministram as disciplinas. |
| ... |	... |	... |
