import { EditorProps, Monaco } from "@monaco-editor/react"

const handleEditorMount=(editor:EditorProps,monaco:Monaco)=>{
    monaco.languages.registerCompletionItemProvider('sql',{
      provideCompletionItems:()=>{
        const suggestions=[
          {
            label:"SELECT",
            kind:monaco.languages.CompletionItemKind.Keyword,
            insertText:'SELECT'
            
          },{
            label:"WHERE",
            kind:monaco.languages.CompletionItemKind.Keyword,
            insertText:"WHERE"
          },{
            label:"FROM",
            kind:monaco.languages.CompletionItemKind.Keyword,
            insertText:"FROM"
          }, 
          {
            label:"CREATE",
            kind:monaco.languages.CompletionItemKind.Keyword,
            insertText:"CREATE TABLE"
          }
        ]
        return {suggestions}
      }
    })
  }

  export {handleEditorMount}