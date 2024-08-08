from supabase import create_client

def get_db_connection():
    supabase_url = "https://lfzdckirqhzlmpfokaxp.supabase.co"
    supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmemRja2lycWh6bG1wZm9rYXhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMxMzQ2ODIsImV4cCI6MjAzODcxMDY4Mn0.4ounkh4x-8-Xoe8L3jnGtFbccYj4GkdcF-RhLkb1j9w"
    supabase = create_client(supabase_url, supabase_key)
    return supabase

if __name__ == "__main__":
    conn = get_db_connection()
    print(conn)