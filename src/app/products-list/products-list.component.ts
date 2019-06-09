import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm, Validators, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Router, ActivatedRoute, Event } from '@angular/router';
import { mimevalidators } from './mime-type.validator';
import { AuthService } from '../service/auth-service.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  productForm: FormGroup;
  apiPath = "http://localhost:3000/products/";
  getproductData;
  productDataId;
  buttontext = 'Create'

  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService) { }
  ngOnInit() {
    this.getData();
    this.createForm();
    this.getIdByURL();
  }
  // get ID
  getIdByURL() {
    this.route.paramMap.subscribe(
      (param) => {
        const id = param.get('id');
        this.productDataId = id;
        if (id) {
          console.log(id)
          this.getDataById(id);
          this.buttontext = 'Update'
        }
      }
    );
  }

  // Product Form
  createForm() {
    this.productForm = this.fb.group({
      productname: [null, [Validators.required]],
      price: [null, Validators.required],
      productimage: [null, [Validators.required,]]
    })
  }

  // Add and Update Product
  addProduct(form: NgForm) {
    // if (this.productForm.invalid) {
    //   return;
    // }
    if (this.productDataId) {
      const requestBody = [
        {
          "productCategory": "name",
          "value": this.productForm.get('productname').value
        },
        {
          "productCategory": "price",
          "value": this.productForm.get('price').value
        }
      ]
      this.http.patch(this.apiPath + this.productDataId, requestBody).subscribe(
        (res) => {
          console.log(res);
          this.getData();
          this.productForm.reset();
          this.router.navigate(['/product']);
        },
        (err) => {
          console.log(err);
        }
      )
    }
    else {
      // let httpOptions2 = {
      //   headers: new HttpHeaders({
      //     "Content-Type": "application/jsons",
      //     FROM_DATE: "01/MAY/2014",
      //   })
      // };
      const createBody = {
        'name': this.productForm.get('productname').value,
        'price': this.productForm.get('price').value,
        productimage: [null, [Validators.required, mimevalidators.validatorss]]
        // 'productimage': new FormData().append('file',this.productForm.get('productimage').value)
      }
     
      this.http.post(this.apiPath, createBody ).subscribe(
        (res) => {
          console.log(res);
          this.getData();
          this.productForm.reset();
        }
      )
      console.log(form.value)
    }
  }


  // Delete Product
  delete(id) {
    this.http.delete(this.apiPath + id).subscribe(
      (res) => {
        console.log(res);
        this.getData();
        this.router.navigate(['/product']);
      }
    )
  }

  // get one product info
  getDataById(id) {
    this.http.get(this.apiPath + id).subscribe(
      (res) => {
        console.log(res);
        this.editProduct(res)
      }
    )
  }

  // patch current product value to form
  editProduct(productData) {
    this.productForm.patchValue({
      productname: productData.name,
      price: productData.price
    })
  }

  // get product Data
  getData() {
    this.http.get(this.apiPath).subscribe(
      (res) => {
        console.log(res);
        this.getproductData = res;
      }
    );
  }
  
  image_preview: any;
  onImagePicked(event) {
    const file = event.target.files[0];
    this.productForm.patchValue({
      productimage: file
    })
    this.productForm.get('productimage').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.image_preview = reader.result;
    }
    reader.readAsDataURL(file);

    console.log(file);
    console.log(this.productForm)
  }
}
