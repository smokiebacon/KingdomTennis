import "react-native-url-polyfill/auto"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://eagclsfxzyoakrnupvay.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhZ2Nsc2Z4enlvYWtybnVwdmF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxMjM4MzcsImV4cCI6MjAxNTY5OTgzN30.auI2t_EyxsSc0iAKSk74KukWay-fvGR4R2kGTsEyRt0"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
