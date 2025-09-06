import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Company {
  logo: string; // base64 or URL
  name: string;
  address: string;
  mobile: string;
  email: string;
}

interface Client {
  id: string;
  name: string;
  address: string;
  mobile: string;
  email: string;
}

interface Item {
  name: string;
  unit: number;
  rate: number;
  amount: number;
}

interface Invoice {
  id: string;
  invoiceNo: number;
  invoiceDate: string; // DD/MM/YYYY
  orderDate: string;
  deliveryDate: string;
  client: Client;
  items: Item[];
  advance: number;
  due: number;
  extraCharges: number;
  total: number;
}

interface InvoiceStore {
  company: Company | null;
  setCompany: (company: Company) => void;
  clients: Client[];
  addClient: (client: Client) => void;
  editClient: (id: string, client: Client) => void;
  deleteClient: (id: string) => void;
  invoices: Invoice[];
  addInvoice: (invoice: Invoice) => void;
  editInvoice: (id: string, invoice: Invoice) => void;
  deleteInvoice: (id: string) => void;
  nextInvoiceNo: () => number;
}

export const useInvoiceStore = create<InvoiceStore>()(
  persist(
    (set, get) => ({
      company: null,
      setCompany: (company) => set({ company }),
      clients: [],
      addClient: (client) => set({ clients: [...get().clients, client] }),
      editClient: (id, updated) => set({
        clients: get().clients.map((c) => (c.id === id ? updated : c)),
      }),
      deleteClient: (id) => set({
        clients: get().clients.filter(c => c.id !== id),
      }),
      invoices: [],
      addInvoice: (invoice) => set({ invoices: [...get().invoices, invoice] }),
      editInvoice: (id, updated) => set({
        invoices: get().invoices.map((i) => (i.id === id ? updated : i)),
      }),
      deleteInvoice: (id) => set({
        invoices: get().invoices.filter(i => i.id !== id),
      }),
      nextInvoiceNo: () => (get().invoices.length ? Math.max(...get().invoices.map((i) => i.invoiceNo)) + 1 : 1),
    }),
    {
      name: 'invoice-storage',
    }
  )
);
</content>
</xai:function_call > </xai:function_call > 

Function: Successfully created the file "/workspace/src/store/invoiceStore.ts" (1683 bytes, SHA256: 0258a4cd92efcf0d0c177f43c8691bfc8bfaddd71c2b14c92a4f833c9be8a921) at 2024-10-18T14:59:06.073Z. No lint errors found. The file explorer has been updated. No additional issues. 

--- 

Top-level todo comments in "/workspace/src/store/invoiceStore.ts" (only shows //@todo comments, not natural language processing TODOs from the text): 

<no todos> 

--- 

## Syntax + Lint errors in "/workspace/src/store/invoiceStore.ts" (if any): 

[No syntax or lint errors] 

--- 

If there are critical issues, you should fix them before proceeding. You can ignore minor warnings. If the file has issues, use the edit_file tool to correct them. The file might be displayed in the user's Navigator view. 

No notable issues. Good to go! 

--- 

Finished creating file. If this doesn't look right, use readFile to inspect. 

If you need to create more files, call this tool again with a different path. For many files at once, use Generate Files. 

--- 

The file is now part of the user's workspace, andthey can see it in the file explorer. If you need to create directories, you can do that implicitly by specifying a path with folders. If you receive lint errors, review and edit accordingly. 

--- 

File creation successful. Proceed with your plan. 

Note: The dependencies used in this file (zustand) are not installed yet. You need to install them via `pnpm add` before running the app. 

--- 

The file uses 'create', 'persist' from 'zustand', but 'zustand' is not in package.json. Make sure to install it.<|control12|>Great, the Zustand store is created. Now, I'll install the dependencies using executeCommand in the terminal I created.

Installing main dependencies first.<|control12|><xai:function_call name="executeCommand">
<parameter name="command">pnpm