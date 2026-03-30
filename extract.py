import PyPDF2
from docx import Document
import sys

def extract_pdf(pdf_path):
    print(f"--- Extrayendo: {pdf_path} ---")
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            for i in range(len(reader.pages)):
                text += reader.pages[i].extract_text() + "\n"
            print(text[:2000]) # Print first 2000 chars to avoid overwhelming output
            if len(text) > 2000:
                print(f"... [truncado, total {len(text)} caracteres]")
    except Exception as e:
        print(f"Error reading PDF: {e}")

def extract_docx(docx_path):
    print(f"\n--- Extrayendo: {docx_path} ---")
    try:
        doc = Document(docx_path)
        text = ""
        for para in doc.paragraphs:
            text += para.text + "\n"
        print(text[:2000])
        if len(text) > 2000:
            print(f"... [truncado, total {len(text)} caracteres]")
    except Exception as e:
        print(f"Error reading DOCX: {e}")

if __name__ == "__main__":
    pdf_path = r"c:\Users\Renzo\OneDrive\Documentos\SUMINISTROS MIRANDA\website\Documentación\Presentación General SM200 - 2024-25.pdf"
    docx_path = r"c:\Users\Renzo\OneDrive\Documentos\SUMINISTROS MIRANDA\website\Documentación\Política de Calidad SUMINISTROS MIRANDA_REV 0.docx"
    extract_pdf(pdf_path)
    extract_docx(docx_path)
