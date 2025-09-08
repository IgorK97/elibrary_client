// import React, { useEffect, useRef } from 'react';
// import { getDocument, GlobalWorkerOptions, version } from 'pdfjs-dist';
// //import * as pdfjsLib from 'pdfjs-dist';

// GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;
// import worker from 'pdfjs-dist/build/pdf.worker?url';
// GlobalWorkerOptions.workerSrc = worker;
// const PdfViewer: React.FC<{ bookId: number }> = ({ bookId }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const url = `https://localhost:7188/api/books/${bookId}.pdf`;

//     const loadingTask = getDocument({
//       url,
//       rangeChunkSize: 65536, // размер блока для частичных запросов
//     });

//     loadingTask.promise.then(async (pdf) => {
//       console.log(`PDF loaded with ${pdf.numPages} pages`);

//       // Пример: отрисовать страницу 5
//       const page = await pdf.getPage(5);
//       const viewport = page.getViewport({ scale: 1.5 });

//       const canvas = canvasRef.current;
//       if (!canvas) return;

//       const context = canvas.getContext('2d');
//       canvas.width = viewport.width;
//       canvas.height = viewport.height;

//       await page.render({ canvasContext: context!, viewport, canvas }).promise;
//     });
//   }, [bookId]);

//   return <canvas ref={canvasRef} />;
// };

// export default PdfViewer;
import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import worker from 'pdfjs-dist/build/pdf.worker?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = worker;

const PdfViewer: React.FC<{ bookId: number }> = ({ bookId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const renderTaskRef = useRef<any>(null);
  const pdfDocRef = useRef<any>(null);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        setLoading(true);
        setError(null);

        // Отменяем текущую задачу рендеринга, если она существует
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        const url = `https://localhost:7188/api/books/${bookId}.pdf`;

        const loadingTask = pdfjsLib.getDocument({
          url,
          rangeChunkSize: 65536,
        });

        const pdf = await loadingTask.promise;
        pdfDocRef.current = pdf;

        setTotalPages(pdf.numPages);
        console.log(`PDF loaded with ${pdf.numPages} pages`);

        // Рендерим первую страницу
        await renderPage(pdf, currentPage);

        setLoading(false);
      } catch (err) {
        console.error('Error loading PDF:', err);
        setError('Failed to load PDF');
        setLoading(false);
      }
    };

    loadPdf();

    // Функция очистки при размонтировании компонента
    return () => {
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
      if (pdfDocRef.current) {
        pdfDocRef.current.destroy();
      }
    };
  }, [bookId]);

  const renderPage = async (pdf: any, pageNumber: number) => {
    try {
      // Отменяем предыдущую задачу рендеринга
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }

      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1.5 });

      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext('2d');
      if (!context) return;

      // Очищаем canvas перед новым рендерингом
      context.clearRect(0, 0, canvas.width, canvas.height);

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Создаем новую задачу рендеринга
      renderTaskRef.current = page.render({
        canvasContext: context,
        viewport: viewport,
      });

      await renderTaskRef.current.promise;
      renderTaskRef.current = null;
    } catch (err) {
      // Игнорируем ошибки отмены рендеринга
      if (err && err.name === 'RenderingCancelledException') {
        console.log('Rendering cancelled');
        return;
      }
      console.error('Error rendering page:', err);
      throw err;
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      renderPage(pdfDocRef.current, newPage);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      renderPage(pdfDocRef.current, newPage);
    }
  };

  if (loading) return <div>Loading PDF...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div>
        <button onClick={goToPreviousPage} disabled={currentPage <= 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage >= totalPages}>
          Next
        </button>
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default PdfViewer;
