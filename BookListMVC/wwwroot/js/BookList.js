﻿var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#DT_load').DataTable({
        "ajax": {
            "url": "/Books/GetAll/",
            "type": "GET",
            "dataType": "json"
        },
        "columns": [
            { "data": "name", "width": "20%" },
            { "data": "author", "width": "20%" },
            { "data": "isbn", "width": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                                <a href="/Books/Upsert?id=${data}" class="btn btn-success text-white" style="cursor:pointer; width:70px;">
                                    Edit
                                </a>
                                &nbsp;
                                <a class="btn btn-danger text-white" style="cursor:pointer; width:70px;" onclick=Delete("/Books/Delete?id="+${data})>
                                    Delete
                                </a>
                            </div>`;
                },
                "width": "40%"
            }
        ],
        "language": {
            "emptyTable": "No Data Found."
        },
        "width": "100%"
    });
}

function Delete(url) {
    Swal.fire({
        title: "Are You sure?",
        text: "Once deleted, you will not be able to recover",
        icon: "warning",
        showConfirmButton: true,
        confirmButtonText: "Yes",
        showDenyButton: true,
        focusConfirm: true
    }).then(willDelete => {
        if (willDelete.isConfirmed) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
}
