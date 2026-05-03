import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getCategories, createCategory, deleteCategory, updateCategory, getCategory } from '../api/categories.api'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export function CategoriesFormPage() {
  return (
    <div>CategoriesFormPage</div>
  )
}