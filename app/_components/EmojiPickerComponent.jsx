import EmojiPicker from 'emoji-picker-react';
import React, { useState } from 'react'

function EmojiPickerComponent({ children, setEmojiIcon }) {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  return (
    <div className='relative'>
      <div onClick={()=> setOpenEmojiPicker(val => !val)}>
        {children}
      </div>

      {
        openEmojiPicker && 
        <div className='absolute left-20 -top-64 z-10 mt-3'>
          <EmojiPicker 
              emojiStyle='facebook'
              onEmojiClick={(e) => {
                // console.log(e.emoji);
                setEmojiIcon(e.emoji);
                setOpenEmojiPicker(false);
              }}
          />
        </div>
      }
    </div>
  )
}

export default EmojiPickerComponent;