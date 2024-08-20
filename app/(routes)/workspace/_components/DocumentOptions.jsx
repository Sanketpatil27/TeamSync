import { Link2Icon, MoreVerticalIcon, PenBoxIcon, Share2Icon, Trash2Icon } from 'lucide-react'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


function DocumentOptions({doc, deleteDocument}) {
    return (
        <div>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreVerticalIcon size={14} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem> <Link2Icon className='h-4 w-4 mr-2'/> Share</DropdownMenuItem>
                    <DropdownMenuItem> <PenBoxIcon className='h-4 w-4 mr-2'/> Rename</DropdownMenuItem>
                    <DropdownMenuItem 
                        onClick={()=>deleteDocument(doc.id)}
                        className="text-red-500"> <Trash2Icon className='h-4 w-4 mr-2'/> Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}

export default DocumentOptions