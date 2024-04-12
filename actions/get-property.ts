export const getProperty = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/properties/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch data');

    return res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
};
