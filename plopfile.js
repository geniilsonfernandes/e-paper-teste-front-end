module.exports = function (plop) {
  plop.setGenerator("component", {
    description: "Cria um componente React",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Nome do componente:",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/index.ts",
        templateFile: "templates/Component.ts.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "templates/Component.tsx.hbs",
      },
    ],
  });
};
