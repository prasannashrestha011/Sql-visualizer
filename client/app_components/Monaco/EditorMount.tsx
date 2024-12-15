import {  Monaco } from "@monaco-editor/react";


const handleEditorMount = ( monaco: Monaco) => {
  monaco.languages.registerCompletionItemProvider("sql", {
    provideCompletionItems: (model, position) => {
      const suggestions = [
        {
          label: "SELECT",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "SELECT",
          range: new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column), // Add the range property
        },
        {
          label: "WHERE",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "WHERE",
          range: new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column),
        },
        {
          label: "FROM",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "FROM",
          range: new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column),
        },
        {
          label: "CREATE",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "CREATE TABLE",
          range: new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column),
        },
      ];

      return { suggestions };
    },
  });
};

export { handleEditorMount };
