import { HistoryRecords } from "../types/historyRecords";
import { getById, update } from "./queries";
import { supabase } from "./supabaseClient";


export async function insertManyHistory(
    historyList: Omit<HistoryRecords, "id">[]
): Promise<HistoryRecords[]> {
    const { data, error } = await supabase
        .from("history")
        .insert(historyList)
        .select();

    if (error) {
        console.error("Erro ao inserir múltiplos históricos:", error);
        throw error;
    }

    return data;
}

export async function getAllHistoryByUser<HistoryRecords>(userId: number): Promise<HistoryRecords[] | null> {
    let query = supabase
        .from("history")
        .select(`
          *,
          products(name)
        `)
        .eq("user_id", userId)
        .order("date_loan", { ascending: true });

    const { data, error } = await query;
    if (error) throw error;
    return data;
}

export async function getAllHistoryBySelectedTab<HistoryRecords>(tab: string, type: string): Promise<HistoryRecords[] | null> {
    let query = supabase
        .from("history")
        .select(`
          *,
          products(name),
          users(name, registration)
        `)
        .order("date_loan", { ascending: true });

    if (tab === "espera") query = query.eq("status_id", 10);
    if (tab === "alugadas") query = query.eq("status_id", 11);
    if (tab == "devolvidas") query = query.eq("status_id", 12);
    if (type == "admin") if (tab == "recusados") query = query.eq("status_id", 13);
    if (type == "user") if (tab == "recusados") query = query.eq("status_id", 14);

    const { data, error } = await query;
    if (error) throw error;
    return data;
}

export async function getAllHistory<HistoryRecords>(): Promise<HistoryRecords[] | null> {
    let query = supabase
        .from("history")
        .select(`
          *,
          products(name),
          users(name, registration)
        `)

    const { data, error } = await query;
    if (error) throw error;
    return data;
}

export async function confirmLoan<T>(id: number): Promise<void> {
  
    let historyRecord: HistoryRecords | null = null;
  
    try {
      historyRecord = await getById<HistoryRecords>("history", id);
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
    }
  
    if (!historyRecord) {
      console.warn(`Histórico com ID ${id} não encontrado.`);
    }
  
    try {
      const data = await update("history", id, { date_loan : new Date(), status_id: 11,});
  
      if (!data) {
        console.warn(`Erro ao atualizar data empréstimo do histórico ID ${id}.`);
      }
    } catch (error) {
      console.error("Erro ao atualizar histórico:", error);
    }
  }

  export async function confirmReturn<T>(id: number): Promise<void> {
  
    let historyRecord: HistoryRecords | null = null;
  
    try {
      historyRecord = await getById<HistoryRecords>("history", id);
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
    }
  
    if (!historyRecord) {
      console.warn(`Histórico com ID ${id} não encontrado.`);
    }
  
    try {
      const data = await update("history", id, { date_return : new Date(), status_id: 12,});
  
      if (!data) {
        console.warn(`Erro ao atualizar data empréstimo do histórico ID ${id}.`);
      }
    } catch (error) {
      console.error("Erro ao atualizar histórico:", error);
    }
  }

  export async function refused<T>(id: number, type: string): Promise<void> {
  
    let historyRecord: HistoryRecords | null = null;
  
    try {
      historyRecord = await getById<HistoryRecords>("history", id);
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
    }
  
    if (!historyRecord) {
      console.warn(`Histórico com ID ${id} não encontrado.`);
    }
  
    try {
      let status = 0;
      if(type == "admin") status = 13
      else status = 14
      const data = await update("history", id, { date_refused : new Date(), status_id: status });
  
      if (!data) {
        console.warn(`Erro ao atualizar data empréstimo do histórico ID ${id}.`);
      }
    } catch (error) {
      console.error("Erro ao atualizar histórico:", error);
    }
  }