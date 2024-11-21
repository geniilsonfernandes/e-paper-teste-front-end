<p align="center" id="menu">
<iframe width="560" height="315" src="https://www.youtube.com/embed/CVMx3trycY0?si=I9t4fpuCabmI1Km4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


<a  href="https://e-paper-teste-front-end.vercel.app/">LINK PARA O PROJETO</a>
</p>
<h2 align="center">ePaper | Frontend</h2>

<p align="center" id="menu">
  <a href="#sobre-o-projeto">Sobre o projeto</a>
  <a href="#stacks-utilizadas">Stacks utilizadas</a>
  <a href="#instalação-e-execução-local">Instalação e execução local</a>
  <a href="#documentação">Documentação</a>
</p>

<h2 align="center" id="sobre-o-projeto">Sobre o projeto</h2>

<p align="center">
  Este é um projeto desenvolvido como parte de um teste prático para processo seletivo. O objetivo do projeto foi construir uma aplicação frontend de forma eficiente e seguindo boas práticas de desenvolvimento, com foco na otimização de performance e na aderência ao design proposto.
</p>

<p align="center">
  A interface foi construída com base nos padrões definidos no UI Design, garantindo uma experiência consistente e intuitiva para o usuário. Durante o desenvolvimento, busquei aplicar boas práticas de codificação, como a separação de responsabilidades, o uso de componentes reutilizáveis e a utilização eficiente do React para otimização do desempenho da aplicação.
</p>

<p align="center">
  Também utilizei o Plop.js para automatizar a criação de componentes e melhorar a produtividade durante o desenvolvimento.


<h2 align="center" id="recursos-adicionais">Recursos Adicionais</h2>

## Upload de Documentos com Cloudinary

O projeto implementa upload de documentos utilizando a plataforma Cloudinary, oferecendo:

- Gerenciamento de mídia na nuvem

## Prima 

O projeto utiliza a biblioteca [Prisma](https://www.prisma.io/) para gerenciar as tabelas do banco de dados.

```
model Document {
  id           String    @id @default(uuid())
  code         String    @unique
  docType      String
  docOrigin    String
  documentName String
  emitter      String
  amount       Float
  liquidValue  Float
  url          String
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}
```

## Endpoints da API - TS-REST

#### Criação de Documento

```typescript
// src/shared/contracts
// api/document - POST

type createDocument {
  docType: string;
  docOrigin: string;
  documentName: string;
  url: string; // URL do arquivo no Cloudinary
}
```

#### Listagem de Documentos

```typescript
// src/shared/contracts
// api/document - GET
type query = {
  page: number;
  initialDate: string;
  finalDate: string;
  docType: string;
  docOrigin: string;
  emitter: string;
  amount: number;
  liquidValue: number;
  documentName: string;
};

type response = {
  id: string;
  code: string;
  docType: string;
  docOrigin: string;
  docType: string;
  docOrigin: string;
  documentName: string;
  emitter: string;
  amount: number;
  liquidValue: number;
  createdAt: string;
  updatedAt: string;
  url: string;
};
```

Foi usando o [TS-REST](https://github.com/ts-rest/ts-rest) para criar os endpoints da API e o [Zod](https://github.com/colinhacks/zod) para validação dos dados da requisição.

### Client Side

foi usado [React Query](https://react-query.tanstack.com/) para a listagem de documentos e para mutações.

---

### Configuração do Cloudinary

Adicione as seguintes variáveis de ambiente:

```
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret
```

### Exemplo de Upload

```typescript
// src/modules/dashboard/hooks/useDocumentUpload.ts
import { v2 as cloudinary } from "cloudinary";

const uploadDocument = async (
  values: UploadDocumentProps,
  onProgress: (progress: number) => void
) => {
  const formData = new FormData();
  formData.append("file", values.file);
  formData.append("upload_preset", "ml_default");

  return await axios.post<CloudinaryFile>(
    `https://api.cloudinary.com/v1_1/dbpayojb3/image/upload`,
    formData,
    {
      onUploadProgress: (event) => {
        if (event.total) {
          const progress = Math.round((100 * event.loaded) / event.total);
          onProgress(progress);
        }
      },
    }
  );
};
```

## Para executar o projeto, basta seguir os passos abaixo:

1. configurar as variáveis de ambiente



2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse o projeto em http://localhost:3000
