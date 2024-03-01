CREATE POLICY "Team members can insert objects in the company bucket"
ON storage.objects
FOR INSERT TO public WITH CHECK
(bucket_id = 'invoices' AND 
(storage.foldername(name))[1] IN (
  select
    private.get_companies_for_authenticated_user()::text
));
