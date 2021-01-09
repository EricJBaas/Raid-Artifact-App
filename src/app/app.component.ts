import { Component, ViewChild, OnInit, AfterViewInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { FileUploader } from "ng2-file-upload";
const fs: any = window.require("fs");
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("fileInput") fileInput;
  private data = [];
  public file;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
    this.data = JSON.parse(fs.readFileSync(this.file.path));
    this.dataSource.data = this.data;
    this.dataSource._updateChangeSubscription();
  }

  displayedColumns: string[] = [
    "Set",
    "ArtifactType",
    "Rank",
    "Level",
    "PrimaryStat",
    "Substats",
    "WeightedValue"];

  applyFilter(event: Event): void {
    const filterValue: string = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
