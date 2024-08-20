    import React, { useEffect, useRef, useState } from 'react'
    import EditorJS from '@editorjs/editorjs';
    import Header from '@editorjs/header';
    import Delimiter from '@editorjs/delimiter';
    import Alert from 'editorjs-alert';
    import List from "@editorjs/list";
    import NestedList from '@editorjs/nested-list';
    import Checklist from '@editorjs/checklist'
    import Embed from '@editorjs/embed';
    import SimpleImage from 'simple-image-editorjs';
    import Table from '@editorjs/table'
    import CodeTool from '@editorjs/code';
    import { TextVariantTune } from '@editorjs/text-variant-tune';
    import Paragraph from '@editorjs/paragraph';
    import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
    import { db } from '@/config/firebaseConfig';
    import { useUser } from '@clerk/nextjs';


    function RichDocumentEditor({ params }) {
        const ref = useRef();
        let editor;
        const { user } = useUser();
        const [documentOutput, setDocumentOutput] = useState([]);
        let isFetched = false;      // used for checkign if document data is already loaded or not

        useEffect(() => {
            user && InitEditor();

            return () => {
                if (editor) {
                    editor.destroy();
                }
            };
        }, [user]);

        // useEffect(() => {
        //     params && GetDocumentOutput();
        // }, [params])

        // save the document into firestore
        const SaveDocument = () => {
            ref.current.save().then(async (outputData) => {
                // console.log(outputData);
                const docRef = doc(db, 'documentOutput', params?.documentid)

                await updateDoc(docRef, {
                    output: outputData,
                    editedBy: user?.primaryEmailAddress?.emailAddress
                });
            });
        }

        const GetDocumentOutput = () => {
            const unsubscribe = onSnapshot(doc(db, 'documentOutput', params?.documentid),
                (doc) => {
                    console.log(editor)
                    // render only if not already rendered  OR do not render when you're itself changing the content, so don't need to refetch at that time
                    if (doc.data()?.editedBy != user?.primaryEmailAddress?.emailAddress || !isFetched) {
                        // if it has editedBy field means its edited else it is initially empty output [] so not checking data()?.output
                        doc?.data()?.editedBy && editor.render(doc.data()?.output)
                    }
                    isFetched = true;
                })
        }

        const InitEditor = () => {
            if (!editor?.current) {
                editor = new EditorJS({
                    onChange: (api, event) => {
                        SaveDocument();
                    },
                    onReady: () => {
                        GetDocumentOutput();
                    },
                    /**
                     * Id of Element that should contain Editor instance
                    */
                    holder: 'editorjs',
                    tools: {
                        header: Header,
                        delimiter: Delimiter,
                        alert: Alert,
                        table: Table,
                        list: {
                            class: List,
                            inlineToolbar: true,
                            shortcut: 'CMD+SHIFT+L',
                            config: {
                                defaultStyle: 'unordered'
                            },
                        },
                        checklist: {
                            class: Checklist,
                            shortcut: 'CMD+SHIFT+C',
                            inlineToolbar: true,
                        },
                        image: SimpleImage,
                        code: {
                            class: CodeTool,
                            shortcut: 'CMD+SHIFT+P'
                        },
                        paragraph: {
                            class: Paragraph,
                            inlineToolbar: true,
                        },

                        //   textVariant: TextVariantTune
                    },
                });

                ref.current = editor;
            }
        }

        
        return (
            <div className='lg:-ml-40'>
                <div id="editorjs"> </div>
            </div>
        )
    }

    export default RichDocumentEditor