import {  Monaco } from "@monaco-editor/react";
import { SampleQuery1, SampleQuery2 } from "./snippets";


const handleEditorMount = ( monaco: Monaco) => {
  monaco.languages.registerCompletionItemProvider("sql", {
    provideCompletionItems: (model, position) => {
      const currentWord = model.getWordAtPosition(position); //fetch current typed word 
      const prefixLength=currentWord?currentWord.word.length:0
   
      const suggestions = [
        {
          label: "SELECT",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "SELECT",
          range: new monaco.Range(position.lineNumber, 
            position.column-prefixLength, position.lineNumber, position.column), // Add the range property
        },
        {
          label: "WHERE",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "WHERE",
          range: new monaco.Range(position.lineNumber,position.column-prefixLength, position.lineNumber, position.column),
        },
        {
          label: "FROM",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "FROM",
          range: new monaco.Range(position.lineNumber, 
            position.column-prefixLength,
            position.lineNumber, position.column),
        },
        {
          label: "CREATE",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "CREATE TABLE",
          range: new monaco.Range(position.lineNumber, 
            position.column-prefixLength,
            position.lineNumber, 
            position.column),
        },
        {
          "label":"SAMPLE 1",
          kind: monaco.languages.CompletionItemKind.Keyword,
           insertText:SampleQuery1,
           range: new monaco.Range(position.lineNumber, 
            position.column-prefixLength
            , position.lineNumber
            , position.column),
        }, 
        {
        "label":"SAMPLE 2",
          kind: monaco.languages.CompletionItemKind.Keyword,
           insertText:SampleQuery2,
           range: new monaco.Range(position.lineNumber, 
            position.column-prefixLength
            , position.lineNumber
            , position.column),
        }
      ];

      return { suggestions };
    },
  });
};

export { handleEditorMount };
