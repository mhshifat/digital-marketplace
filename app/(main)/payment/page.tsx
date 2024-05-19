export default function PaymentPage({ searchParams }: { searchParams: { status: string } }) {
  return (
    <div>
      <p>Payment {searchParams.status}!</p>
    </div>
  )
}