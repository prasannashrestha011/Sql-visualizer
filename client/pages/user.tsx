import { Editor, EditorProps, Monaco } from '@monaco-editor/react'

import React from 'react'

const user = () => {
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
  return (
    <div className='flex items-center justify-center md:w-4/12'>
      <Editor

      height={"90vh"}
      defaultLanguage='sql'
      theme='custom-theme'
      beforeMount={monaco => {
        monaco.editor.defineTheme('custom-theme', {
          base: 'vs-dark', // Start with the 'vs-dark' base theme
      inherit: true,    // Inherit other settings from the base theme
      rules: [],        // Customize rules (if needed)
      colors: {
        'editor.background': '#17010A', // Set background color to black
      },
        });
      }}
      options={{
        wordWrap:"on"
      }}
      onMount={(editor,monaco:Monaco)=>{
        handleEditorMount(editor,monaco)
        const editorvalue=editor.getValue()
        console.log(editorvalue)
        editor.onDidChangeModelContent(()=>{
          const updatedValues=editor.getValue()
          console.log(updatedValues)
        })
      }}
      />
    </div>
  )
}

export default user