export default function (resp: number) {
    switch (resp) {
      case 400:
        return "Bad Request: Неверный запрос";
      case 401:
        return "Unauthorized: Требуется авторизация";
      case 403:
        return "Forbidden: Доступ запрещен";
      case 404:
        return "Not Found: Страница не найдена";
      case 405:
        return "Method Not Allowed: Метод не поддерживается";
      case 408:
        return "Request Timeout: Время ожидания истекло";
      case 429:
        return "Too Many Requests: Слишком много запросов";
      case 500:
        return "Internal Server Error: Ошибка сервера";
      case 502:
        return "Bad Gateway: Ошибка шлюза";
      case 503:
        return "Service Unavailable: Сервис временно недоступен";
      case 504:
        return "Gateway Timeout: Шлюз не отвечает";
      default:
        return `Unknown Status: Неизвестный код ошибки (${resp})`;
    }

}