<?php
// app/Filters/GlobalSearch.php
namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class GlobalSearch implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $model = $query->getModel();

        if (!property_exists($model, 'searchable') || empty($model->searchable)) {
            return;
        }

        $query->where(function ($query) use ($value, $model) {
            foreach ($model->searchable as $field) {
                if (str_contains($field, '.')) {
                    // Handle nested relationship
                    [$relation, $column] = explode('.', $field, 2);

                    $query->orWhereHas($relation, function ($q) use ($column, $value) {
                        $q->where($column, 'like', "%{$value}%");
                    });
                } else {
                    // Direct field on model
                    $query->orWhere($field, 'like', "%{$value}%");
                }
            }
        });
    }
}
