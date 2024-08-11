import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import CoverOptions from '../_shared/CoverOptions'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

function CoverPicker({ children, updateCoverImg }) {
  const [selectedCover, setSelectedCover] = useState("");


  return (
    <div>
      <Dialog>
        <DialogTrigger className='w-full'> {children} </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Cover</DialogTitle>
            <DialogDescription>

              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-3'>
                {
                  CoverOptions.map((item) => {
                    return <div onClick={() => setSelectedCover(item?.imageUrl)}
                          className={`${selectedCover == item?.imageUrl && 'border-2 border-primary'} p-1 rounded-lg`}
                    >
                      <Image src={item?.imageUrl} width={200} height={140} alt='coverImg'
                        className='h-[70px] w-full rounded-md object-cover'
                      />
                    </div>
                  })
                }
              </div>

            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            
            <DialogClose asChild>
              <Button onClick={() => updateCoverImg(selectedCover)} type="button" >
                Update
              </Button>
            </DialogClose>
          </DialogFooter>

        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CoverPicker