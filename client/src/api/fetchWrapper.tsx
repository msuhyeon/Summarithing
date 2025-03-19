const BASE_URL = 'http://localhost:5000';

type ApiRequestFunction = <T>(url: string, method?: string, data?: object | null) => Promise<T>;

const fetchWrapper: ApiRequestFunction = async (url, method = 'GET', data = null) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
    };

    const response = await fetch(`${BASE_URL}${url}`, options);

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API 호출 오류: ${error}`);
    throw error;
  }
};

export default fetchWrapper;
