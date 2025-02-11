import numpy as np
import random 
# arr  = np.arange(10, 101, 10)



# **  Numpy Array **

# arr1 = np.array([1, 2, 3, 4])  # 1D array
# arr2 = np.array([[1, 2, 3], [4, 5, 6]])  # 2D array
# arr3 = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])  # 3D array

# # print(arr1)
# # print(arr2)
# print(arr2)
# print(type(arr2))
# print(arr2.size)
# print(arr2.shape)
# print(arr2.ndim)


# 3  **  Array Initialization  **

# arr = np.zeros((2, 3))
# arr = np.ones((3, 4))
# arr = np.random.rand(3, 3)
# arr = np.random.randint(1, 20, ( 3, 2))

# arr = np.arange(1, 10, 2)

# arr2d = np.array([[1, 2, 3], [4, 5, 6]])
# print(arr2d[0, 1])  # 2


# A = np.array([[1, 2], [3, 4]])
# B = np.array([[5, 6], [7, 8]])

# # print(A + B)  # Element-wise addition
# print(A @ B)  # Matrix multiplication
# print(np.dot(A, B))  # Alternative matrix multiplication

# arr1 = np.array([1, 2, 3])
# arr2 = np.array([4, 5, 6])
# concat_arr = np.concatenate((arr1, arr2))
# print(concat_arr)

arr = np.array([[1, 2, 3], [4, 5, 6]])
arr2 = np.array([1, 2, 3])
print(arr + arr2)  # Broadcasting
