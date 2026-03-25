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

![dcu](https://github.com/user-attachments/assets/41f6b731-b44e-43aa-911f-423ad6198f47)
 
### 3.4.2 Descrições de Casos de Uso

Cada caso de uso deve ter a sua descrição representada nesta seção. Exemplo:

#### Gerenciar Professor (CSU01)

Sumário: A Secretária realiza a gestão (inclusão, remoção, alteração e consulta) dos dados sobre professores.

Ator Primário: Secretária.

Ator Secundário: Coordenador.

Pré-condições: A Secretária deve ser validada pelo Sistema.

Fluxo Principal:

1) 	A Secretária requisita manutenção de professores.
2) 	O Sistema apresenta as operações que podem ser realizadas: inclusão de um novo professor, alteração de um professor, a exclusão de um professor e a consulta de dados de um professor.
3) 	A Secretária seleciona a operação desejada: Inclusão, Exclusão, Alteração ou Consulta, ou opta por finalizar o caso de uso.
4) 	Se a Secretária desejar continuar com a gestão de professores, o caso de uso retorna ao passo 2; caso contrário o caso de uso termina.

Fluxo Alternativo (3): Inclusão

a)	A Secretária requisita a inclusão de um professor. <br>
b)	O Sistema apresenta uma janela solicitando o CPF do professor a ser cadastrado. <br>
c)	A Secretária fornece o dado solicitado. <br>
d)	O Sistema verifica se o professor já está cadastrado. Se sim, o Sistema reporta o fato e volta ao início; caso contrário, apresenta um formulário em branco para que os detalhes do professor (Código, Nome, Endereço, CEP, Estado, Cidade, Bairro, Telefone, Identidade, Sexo, Fax, CPF, Data do Cadastro e Observação) sejam incluídos. <br>
e)	A Secretária fornece os detalhes do novo professor. <br>
f)	O Sistema verifica a validade dos dados. Se os dados forem válidos, inclui o novo professor e a grade listando os professores cadastrados é atualizada; caso contrário, o Sistema reporta o fato, solicita novos dados e repete a verificação. <br>

Fluxo Alternativo (3): Remoção

a)	A Secretária seleciona um professor e requisita ao Sistema que o remova. <br>
b)	Se o professor pode ser removido, o Sistema realiza a remoção; caso contrário, o Sistema reporta o fato. <br>

Fluxo Alternativo (3): Alteração

a)	A Secretária altera um ou mais dos detalhes do professor e requisita sua atualização. <br>
b)	O Sistema verifica a validade dos dados e, se eles forem válidos, altera os dados na lista de professores, caso contrário, o erro é reportado. <br>
 
Fluxo Alternativo (3): Consulta

a)	A Secretária opta por pesquisar pelo nome ou código e solicita a consulta sobre a lista de professores. <br>
b)	O Sistema apresenta uma lista professores. <br>
c)	A Secretária seleciona o professor. <br>
d)	O Sistema apresenta os detalhes do professor no formulário de professores. <br>

Pós-condições: Um professor foi inserido ou removido, seus dados foram alterados ou apresentados na tela.

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
