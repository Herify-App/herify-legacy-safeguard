
DROP POLICY IF EXISTS "Beneficiary can view own entries" ON public.beneficiaries;
DROP POLICY IF EXISTS "Beneficiary can view linked assets" ON public.assets;

CREATE POLICY "Beneficiary can view own entries"
ON public.beneficiaries
FOR SELECT
TO authenticated
USING (
  COALESCE(((auth.jwt() ->> 'email_verified'))::boolean, false) = true
  AND lower(email) = lower((auth.jwt() ->> 'email'))
);

CREATE POLICY "Beneficiary can view linked assets"
ON public.assets
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.beneficiaries b
    WHERE b.asset_id = assets.id
      AND COALESCE(((auth.jwt() ->> 'email_verified'))::boolean, false) = true
      AND lower(b.email) = lower((auth.jwt() ->> 'email'))
  )
);
