import { type ChangeEvent, useState } from 'react';
import './App.css';
import { Button } from '@mono/ui';
import { add } from '@mono/utils';
import { CheckBox } from '@mono/ui';
import PdfViewer from './PdfViewer';

function App() {
  const [nums, setNums] = useState({
    a: '',
    b: '',
  });
  const [isChecked, setIsChecked] = useState(false);
  const handleNumChange =
    (key: keyof typeof nums) => (e: ChangeEvent<HTMLInputElement>) => {
      setNums((prevNums) => ({
        ...prevNums,
        [key]: e.target.value,
      }));
      console.log(nums);
    };

  return (
    <>
      <input type="text" value={nums.a} onChange={handleNumChange('a')} />
      <input type="text" value={nums.b} onChange={handleNumChange('b')} />
      <Button
        onClick={() => {
          console.log(add(Number(nums.a), Number(nums.b)));
        }}
      >
        Add
      </Button>
      <CheckBox value={isChecked} onChange={() => setIsChecked(!isChecked)} />
      <PdfViewer bookId={1} />
    </>
  );
}

export default App;
