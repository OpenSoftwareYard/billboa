CREATE POLICY "Team members can update objects in the company bucket"
ON storage.objects
FOR SELECT TO public USING
(bucket_id = 'invoices' AND 
(storage.foldername(name))[1] IN (
  select
    private.get_companies_for_authenticated_user()::text
));
