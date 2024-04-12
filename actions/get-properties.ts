export const getProperties = async ({ showFeatured = false } = {}) => {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

  if (apiDomain === undefined || !apiDomain)
    throw new Error('No Api domain url found!');

  try {
    const res = await fetch(
      `${apiDomain}/properties${showFeatured ? '/featured' : ''}`,
      {
        cache: 'no-store',
      }
    );

    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
