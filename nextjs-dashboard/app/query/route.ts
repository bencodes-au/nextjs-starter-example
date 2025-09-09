import postgres from 'postgres';

// Connect to your database using the environment variable
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Function to query invoices
async function listInvoices() {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;
  return data;
}

// API route handler
export async function GET() {
  try {
    const invoices = await listInvoices();
    return new Response(JSON.stringify({ invoices }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
