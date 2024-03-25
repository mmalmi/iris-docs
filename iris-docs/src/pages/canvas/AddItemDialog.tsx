import { FormEvent, useRef } from 'react';

import { uploadFile } from '@/shared/upload';

type AddItemDialogProps = {
  onSubmit: (e?: FormEvent) => void;
  newItemValue: string;
  setNewItemValue: (value: string) => void;
  onClose: () => void;
};

export function AddItemDialog({
  onSubmit,
  newItemValue,
  setNewItemValue,
  onClose,
}: AddItemDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = async () => {
    if (fileInputRef.current?.files?.length) {
      const file = fileInputRef.current.files[0];
      const url = await uploadFile(file);
      setNewItemValue(url);
    }
  };

  return (
    <form className="flex flex-row gap-2" onSubmit={onSubmit}>
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={onFileChange}
        accept={'.png,.jpg,.jpeg,.gif,.webp,.svg,.avif,.mp4'}
      />
      <button
        className={`btn btn-primary bg-primary`}
        type="button"
        onClick={() => {
          fileInputRef.current?.click();
        }}
      >
        Upload
      </button>
      <input
        type="text"
        className="input input-primary"
        value={newItemValue}
        onChange={(e) => setNewItemValue(e.target.value)}
        placeholder="Text or url"
      />
      <button className="btn btn-primary bg-primary" type="submit">
        Add
      </button>
      <button className="btn btn-outline" type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
}