export function useQuoteExport($axios: any, loading: Ref<boolean>) {
  const exportReport = async (
    type: "pdf" | "csv",
    payload: any
  ): Promise<void> => {
    loading.value = true;

    const mimeType = type === "pdf" ? "application/pdf" : "text/csv";
    const fileExtension = type;

    try {
      const res = await $axios.post("/report/export-quote-summary", {
        ...payload,
        reportType: type,
      }, {
        responseType: "blob",
      });

      const blob = new Blob([res.data], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `quote-summary-${Date.now()}.${fileExtension}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(`${type.toUpperCase()} download error:`, e);
    } finally {
      loading.value = false;
    }
  };

  return { exportReport };
}
