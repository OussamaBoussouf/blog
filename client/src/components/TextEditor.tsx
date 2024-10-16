import { forwardRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";

const TextEditor = forwardRef<TinyMCEEditor, any>(
  function TextEditor(props, ref) {
    return (
      <Editor
        onInit={(_evt, editor) => {
          ref.current = editor;
          console.log('change');
        }}
        apiKey="t6vc61qeklv1v4tk7i6r9eedvgt97b02yiaphbgif2la2phy"
        init={{
          plugins: ["link", "lists"],
          toolbar:
            "undo redo | blocks | bold italic underline strikethrough | checklist numlist bullist indent outdent | link  ",
          menubar: false,
          statusbar: false,
        }}
      />
    );
  }
);

export default TextEditor;
